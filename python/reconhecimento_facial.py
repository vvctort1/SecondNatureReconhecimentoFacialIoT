import cv2
import dlib
import numpy as np
import pickle
import base64
import io
from flask import Flask, request, jsonify
from PIL import Image
import firebase_admin
from firebase_admin import credentials, storage, auth

# DLib
print("Carregando modelos Dlib...")
PREDICTOR = "shape_predictor_5_face_landmarks.dat"
RECOG_MODEL = "dlib_face_recognition_resnet_model_v1.dat"
detector = dlib.get_frontal_face_detector()
sp = dlib.shape_predictor(PREDICTOR)
rec = dlib.face_recognition_model_v1(RECOG_MODEL)
print("Modelos Dlib carregados.")

# Firebase Admin SDK
print("Inicializando Firebase...")
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'your_storageBucket_here' 
})
bucket = storage.bucket()
print("Firebase inicializado.")

# Flask
app = Flask(__name__)
THRESH = 0.6 # Limiar de similaridade



def b64_to_image(b64_string):
    """Converte uma string base64 para uma imagem OpenCV."""
    img_bytes = base64.b64decode(b64_string)
    img_array = np.frombuffer(img_bytes, dtype=np.uint8)
    return cv2.imdecode(img_array, cv2.IMREAD_COLOR)

def get_face_vector(image):
    """Detecta um rosto na imagem e retorna seu vetor de 128 dimensões."""
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    rects = detector(rgb, 1)

    if len(rects) != 1:
        return None # Retorna None se não encontrar exatamente um rosto

    shape = sp(rgb, rects[0])
    face_chip = dlib.get_face_chip(rgb, shape)
    vector = np.array(rec.compute_face_descriptor(face_chip))
    return vector


# Endpoints
@app.route('/register-face', methods=['POST'])
def register_face():
    data = request.get_json()
    user_id = data.get('userId')
    image_b64 = data.get('imageB64')

    if not user_id or not image_b64:
        return jsonify({"error": "userId e imageB64 são obrigatórios"}), 400

    image = b64_to_image(image_b64)
    vector = get_face_vector(image)

    if vector is None:
        return jsonify({"error": "Nenhum rosto detectado ou múltiplos rostos encontrados"}), 400

    # Salva o vetor como um arquivo pkl no Cloud Storage
    blob_path = f"face_vectors/{user_id}.pkl"
    blob = bucket.blob(blob_path)
    blob.upload_from_string(pickle.dumps(vector))

    return jsonify({"message": "Rosto cadastrado com sucesso!"}), 201


@app.route('/login-face', methods=['POST'])
def login_face():
    data = request.get_json()
    image_b64 = data.get('imageB64')
    if not image_b64:
        return jsonify({"error": "imageB64 é obrigatório"}), 400

    unknown_image = b64_to_image(image_b64)
    unknown_vector = get_face_vector(unknown_image)

    if unknown_vector is None:
        return jsonify({"status": "failed", "message": "Nenhum rosto detectado na imagem."}), 401

    # Busca todos os vetores no Storage
    blobs = bucket.list_blobs(prefix="face_vectors/")
    
    best_match_uid = None
    min_dist = 999

    for blob in blobs:
        user_id = blob.name.split('/')[-1].replace('.pkl', '')
        known_vector_bytes = blob.download_as_string()
        known_vector = pickle.loads(known_vector_bytes)
        
        dist = np.linalg.norm(unknown_vector - known_vector)
        
        if dist < min_dist:
            min_dist = dist
            best_match_uid = user_id
            
    if min_dist < THRESH:
        try:
            user = auth.get_user(best_match_uid)
            custom_token = auth.create_custom_token(best_match_uid)
            return jsonify({
                "status": "success",
                "message": "Login bem-sucedido!",
                "customToken": custom_token.decode('utf-8'),
                "uid": user.uid,
                "email": user.email
            })
        except auth.UserNotFoundError:
            return jsonify({"status": "failed", "message": "Usuário correspondente não encontrado no Auth."}), 404
    else:
        return jsonify({"status": "failed", "message": "Rosto não reconhecido."}), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
