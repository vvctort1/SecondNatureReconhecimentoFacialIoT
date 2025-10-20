import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';

LocaleConfig.locales['br'] = {
  monthNames: [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO'
  ],
  monthNamesShort: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';

export default function CalendarScreen() {
  const dataInicio = '2025-06-03';

  const gerarDiasLimpos = () => {
    const hoje = dayjs();
    const inicio = dayjs(dataInicio);
    const dias = hoje.diff(inicio, 'day') + 1;
    const hojeFormatado = hoje.format('YYYY-MM-DD');

    const marcacoes: Record<string, any> = {};

    for (let i = 0; i < dias; i++) {
      const data = inicio.add(i, 'day').format('YYYY-MM-DD');

      if (data === hojeFormatado) {
        marcacoes[data] = {
          selected: true,
          selectedColor: '#54A891',
          selectedTextColor: '#E8E8E8',
        };
      } else {
        marcacoes[data] = {
          selected: true,
          selectedColor: '#9BD589',
          selectedTextColor: '#1B1B1B',
        };
      }
    }

    return { marcacoes, dias };
  };

  const { marcacoes, dias } = gerarDiasLimpos();

  return (
    <LinearGradient style={styles.container} colors={['#4DA7646E', '#BCE0514D']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
      <View style={styles.container2}></View>
      <View style={styles.cardCalendar}>
        <Calendar
          headerStyle={{ borderBottomWidth: 5, borderBottomColor: "#E8E8E8", margin: "5%" }}
          markedDates={marcacoes}
          theme={{
            todayTextColor: '#E8E8E8',
            todayBackgroundColor: "#54A891",
            textDayStyle: { color: "#1B1B1B" },
            arrowColor: '#1B1B1B',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayFontFamily: "Patrick Hand",
            textMonthFontFamily: "Patrick Hand",
          }}
        />
      </View>
      <View style={styles.container3}>
        <Text style={styles.txtTitulo}>Streaks</Text>
        <View style={styles.periodoContainer}>
          <Image source={require("../../Images/calender.png")} />
          <Text style={styles.periodo}>  03/06/25 - Hoje</Text>
        </View>
        <Text style={styles.sequencia}>Sequência de {dias} dias</Text>
        <View style={styles.dividerContainer}>
          <View style={styles.divider1} />
          <View style={styles.divider2} />
        </View>
        <View style={styles.periodoContainer}>
          <Image source={require("../../Images/calender.png")} />
          <Text style={styles.periodo}>  08/01/25 - 29/01/25</Text>
        </View>
        <Text style={styles.sequencia}>Sequência de 22 dias</Text>
        <View style={styles.dividerContainer}>
          <View style={styles.divider3} />
          <View style={styles.divider4} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    height: "10%",
    backgroundColor: "transparent"
  },
  cardCalendar: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    backgroundColor: "#FFF",
    width: "90%",
    marginTop: "15%",
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: "2%",
    paddingVertical: "6%",
    height: "57%"
  },
  container3: {
    backgroundColor: "#FFF",
    height: "90%",
    marginTop: "15%"
  },
  txtTitulo: {
    marginTop: "85%",
    marginLeft: "5%",
    fontFamily: "Inter",
    fontWeight: '700',
    fontSize: 18,
    marginBottom: "7%"
  },
  periodoContainer: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  periodo: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: 500
  },
  sequencia: {
    fontSize: 10,
    fontWeight: 300,
    fontFamily: "Inter",
    marginLeft: "10%",
    marginVertical: "1%"
  },
  dividerContainer: {
    flexDirection: "row",
    marginHorizontal: "10%",
    marginVertical: "3%"
  },
  divider1: {
    height: 5,
    width: "20%",
    backgroundColor: "#9BD589"
  },
  divider2: {
    height: 5,
    width: "80%",
    backgroundColor: "#EEE",
  },
  divider3: {
    height: 5,
    width: "45%",
    backgroundColor: "#9BD589"
  },
  divider4: {
    height: 5,
    width: "55%",
    backgroundColor: "#EEE",
  },
});