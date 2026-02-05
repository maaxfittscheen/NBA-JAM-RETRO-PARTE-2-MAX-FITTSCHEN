import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, SafeAreaView } from 'react-native';

export default function WinnerScreen({ route, navigation }) {
  const { local, visitante, scoreLocal, scoreVisitante, stats } = route.params;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const empate = scoreLocal === scoreVisitante;
  const ganador = scoreLocal > scoreVisitante ? local : visitante;
  const jugadoresParaMvp = empate ? stats : stats.filter(p => p.team === ganador.name);
  const mvp = jugadoresParaMvp.sort((a, b) => b.score - a.score)[0] || { name: 'N/A', score: 0 };
  const topRestantes = stats.sort((a, b) => b.score - a.score).filter(p => p.name !== mvp.name).slice(0, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.winnerBox}>
          <Text style={styles.victoryLabel}>{empate ? "DRAW GAME" : "CHAMPIONS"}</Text>
          
          {!empate && <Image source={{ uri: ganador.logo }} style={styles.winnerLogo} />}

          <Text style={styles.finalResultsText}>FINAL RESULTS</Text>
          <Text style={styles.finalScore}>{scoreLocal} - {scoreVisitante}</Text>
          
          <View style={styles.mvpContainer}>
            <Animated.Text style={[styles.mvpTitle, { opacity: blinkAnim }]}>
              ★ HE'S ON FIRE - MVP ★
            </Animated.Text>
            <Text style={styles.mvpName}>{mvp.name.toUpperCase()}</Text>
            <Text style={styles.mvpPoints}>{mvp.score} PTS</Text>
          </View>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>TOP 4 PERFORMERS</Text>
          {topRestantes.map((player, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statRank}>#{index + 2}</Text>
              <View style={{ flex: 2 }}>
                <Text style={styles.statName}>{player.name.toUpperCase()}</Text>
                <Text style={styles.statTeam}>{player.team.toUpperCase()}</Text>
              </View>
              <Text style={styles.statPts}>{player.score} PTS</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.rematchBtn} onPress={() => navigation.navigate('Selection')}>
          <Text style={styles.rematchText}>PLAY AGAIN</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  contentContainer: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  winnerBox: { 
    width: '92%', alignItems: 'center', backgroundColor: '#1a1a1a', 
    paddingTop: 15, paddingBottom: 20, paddingHorizontal: 15,
    borderWidth: 4, borderColor: '#FFD700', marginBottom: 15 
  },
  victoryLabel: { color: '#FFD700', fontSize: 28, fontWeight: '900', fontStyle: 'italic', marginBottom: 5 },
  winnerLogo: { width: 75, height: 75, resizeMode: 'contain', marginBottom: 8 },
  finalResultsText: {
    color: '#ff4444', fontSize: 14, fontWeight: '900', letterSpacing: 2,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ff4444', marginVertical: 5
  },
  finalScore: { color: '#fff', fontSize: 55, fontWeight: '900', textShadowColor: '#00f2ff', textShadowRadius: 10 },
  mvpContainer: { 
    width: '100%', backgroundColor: '#000', padding: 12, alignItems: 'center', 
    borderWidth: 2, borderColor: '#FFD700', borderStyle: 'dashed', marginTop: 10
  },
  mvpTitle: { color: '#ff4444', fontSize: 13, fontWeight: '900' },
  mvpName: { color: '#FFD700', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  mvpPoints: { color: '#00f2ff', fontSize: 18, fontWeight: 'bold' },
  statsBox: { width: '92%', backgroundColor: '#000', padding: 12, borderWidth: 2, borderColor: '#ff4444' },
  statsTitle: { color: '#ff4444', fontSize: 14, fontWeight: '900', marginBottom: 10, textAlign: 'center' },
  statRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#222', paddingVertical: 8, alignItems: 'center' },
  statRank: { color: '#FFD700', width: 30, fontWeight: '900' },
  statName: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  statTeam: { color: '#666', fontSize: 9 },
  statPts: { color: '#00f2ff', width: 50, textAlign: 'right', fontWeight: '900' },
  rematchBtn: { marginTop: 20, backgroundColor: '#ff4444', padding: 15, width: '80%', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  rematchText: { color: '#fff', fontWeight: '900', fontSize: 18 }
});