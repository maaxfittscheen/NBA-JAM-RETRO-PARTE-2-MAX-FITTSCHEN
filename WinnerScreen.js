import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, SafeAreaView } from 'react-native';

export default function WinnerScreen({ route, navigation }) {
  const { local, visitante, scoreLocal, scoreVisitante, stats } = route.params;
  const blink = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(blink, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(blink, { toValue: 0, duration: 400, useNativeDriver: true }),
    ])).start();
  }, []);

  const win = scoreLocal > scoreVisitante ? local : visitante;
  const tie = scoreLocal === scoreVisitante;
  
  // Lógica para el MVP y el Top 4
  const sortedStats = [...stats].sort((a, b) => b.score - a.score);
  const mvp = sortedStats[0];
  const top4 = sortedStats.slice(1, 5); // Los siguientes 4 mejores después del MVP

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.center}>
        <View style={styles.winBox}>
          <Text style={styles.vLabel}>{tie ? "DRAW" : "CHAMPIONS"}</Text>
          
          {!tie && (
            <View style={styles.wBg}>
              <Image source={{ uri: win.logo }} style={styles.wLogo} />
            </View>
          )}

          <Text style={styles.resT}>FINAL RESULTS</Text>
          <Text style={styles.fS}>{scoreLocal} - {scoreVisitante}</Text>
          
          <View style={styles.mvpBox}>
            <Animated.Text style={[styles.fire, { opacity: blink }]}>★ ON FIRE - MVP ★</Animated.Text>
            <Text style={styles.mN}>{mvp.name.toUpperCase()}</Text>
            <Text style={styles.mP}>{mvp.score} PTS</Text>
          </View>
        </View>

        {/* SECCIÓN RESTAURADA: TOP 4 PERFORMERS */}
        <View style={styles.statsBox}>
          <Text style={styles.topTitle}>TOP PERFORMERS (ALL TEAMS)</Text>
          {top4.map((p, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.rank}>#{i + 2}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{p.name.toUpperCase()}</Text>
                <Text style={styles.teamSub}>{p.team.toUpperCase()}</Text>
              </View>
              <Text style={styles.pts}>{p.score} PTS</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.pBtn} onPress={() => navigation.navigate('Selection')}>
          <Text style={styles.pBtnT}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 15 },
  winBox: { width: '100%', backgroundColor: '#111', padding: 20, alignItems: 'center', borderWidth: 4, borderColor: '#FFD700', marginBottom: 15 },
  vLabel: { color: '#FFD700', fontSize: 32, fontWeight: '900', fontStyle: 'italic' },
  wBg: { backgroundColor: '#FFF', padding: 12, borderRadius: 15, marginVertical: 10 },
  wLogo: { width: 85, height: 85, resizeMode: 'contain' },
  resT: { color: '#ff4444', fontSize: 13, fontWeight: '900', letterSpacing: 2, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ff4444', marginVertical: 5 },
  fS: { color: '#fff', fontSize: 55, fontWeight: '900' },
  mvpBox: { width: '100%', backgroundColor: '#000', padding: 12, marginTop: 10, alignItems: 'center', borderWidth: 2, borderColor: '#FFD700', borderStyle: 'dashed' },
  fire: { color: '#ff4444', fontSize: 12, fontWeight: '900' },
  mN: { color: '#FFD700', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  mP: { color: '#00f2ff', fontSize: 18, fontWeight: 'bold' },
  
  // Estilos de la tabla de estadísticas
  statsBox: { width: '100%', backgroundColor: '#000', padding: 12, borderWidth: 2, borderColor: '#ff4444' },
  topTitle: { color: '#ff4444', textAlign: 'center', fontWeight: '900', marginBottom: 10, fontSize: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#222', alignItems: 'center' },
  rank: { color: '#FFD700', fontWeight: '900', width: 35, fontSize: 14 },
  name: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  teamSub: { color: '#666', fontSize: 9 },
  pts: { color: '#00f2ff', fontWeight: '900', width: 60, textAlign: 'right' },
  
  pBtn: { marginTop: 20, backgroundColor: '#ff4444', padding: 15, width: '80%', alignItems: 'center', borderWidth: 1, borderColor: '#fff' },
  pBtnT: { color: '#fff', fontWeight: '900', fontSize: 16 }
});