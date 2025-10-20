import { QuestionnaireData } from "./Questionnaire";
import { User as FirebaseAuthUser } from "firebase/auth";


export type RootStack = {
    FirstScreen: undefined;
    CadastroScreen: undefined;
    LoginScreen: undefined;
    IntroScreen: undefined;
    Question1Screen: {answers?: QuestionnaireData};
    Question2Screen: {answers: QuestionnaireData};
    Question3Screen: {answers: QuestionnaireData};
    Question4Screen: {answers: QuestionnaireData};
    Question5Screen: {answers: QuestionnaireData};
    AutorizacaoScreen: {answers: QuestionnaireData};
    ReadyScreen: {answers: QuestionnaireData;};
    BottomT: {user: FirebaseAuthUser};
    CheckinScreen: undefined;
    ImpulsoScreen: undefined;
}

export type RootBottomTabs = {
    Menu: {user: FirebaseAuthUser};
    Monitor: undefined;
    Notas: undefined;
    Perfil: undefined;
}


export type RootTopTabs = {
    Resumo: {user: FirebaseAuthUser};
    Calendário: undefined;
    Economias: undefined;
    Impulsos: undefined;
}