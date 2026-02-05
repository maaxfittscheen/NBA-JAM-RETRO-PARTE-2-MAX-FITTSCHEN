import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params;

  // <ESTADO DE PUNTUACION INDIVIDUAL POR JUGADOR>
  const [playerScores, setPlayerScores] = useState({});

  // <LOGICA DE PUNTUACION>
  const sumarPuntos = (playerName, puntos) => {
    setPlayerScores(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + puntos
    }));
  };

  // <CALCULO DE MARCADORES TOTALES>
  const totalLocal = local.players.reduce((sum, p) => sum + (playerScores[p] || 0), 0);
  const totalVisitante = visitante.players.reduce((sum, p) => sum + (playerScores[p] || 0), 0);

  const finalizarPartido = () => {
    // <PREPARAR DATOS DE ESTADISTICAS PARA LA SIGUIENTE PANTALLA>
    const allPlayers = [
      ...local.players.map(p => ({ name: p, score: playerScores[p] || 0, team: local.name })),
      ...visitante.players.map(p => ({ name: p, score: playerScores[p] || 0, team: visitante.name }))
    ];

    navigation.navigate('Winner', {
      local,
      visitante,
      scoreLocal: totalLocal,
      scoreVisitante: totalVisitante,
      stats: allPlayers
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.matchTitle}>MATCH START</Text>
      
      {/* <SECCION MARCADOR CENTRAL> */}
      <View style={styles.scoreRow}>
        <View style={styles.team}>
          <Image source={{ uri: local.logo }} style={styles.matchLogo} />
          <Text style={styles.name}>{local.name.toUpperCase()}</Text>
          <Text style={styles.score}>{totalLocal.toString().padStart(2, '0')}</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.team}>
          <Image source={{ uri: visitante.logo }} style={styles.matchLogo} />
          <Text style={styles.name}>{visitante.name.toUpperCase()}</Text>
          <Text style={styles.score}>{totalVisitante.toString().padStart(2, '0')}</Text>
        </View>
      </View>

      {/* <SECCION DE ROSTERS> */}
      <View style={styles.rostersContainer}>
        <View style={styles.rosterBox}>
          <Text style={styles.rosterTitle}>[ {local.name.toUpperCase()} ]</Text>
          {local.players.map((player, index) => (
            <View key={index} style={styles.playerCard}>
              <Text style={styles.playerNameGame}>{player.toUpperCase()}</Text>
              <Text style={styles.individualScore}>PTS: {playerScores[player] || 0}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.pointBtn} onPress={() => sumarPuntos(player, 2)}>
                  <Text style={styles.pointBtnText}>+2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pointBtn, styles.threeBtn]} onPress={() => sumarPuntos(player, 3)}>
                  <Text style={styles.pointBtnText}>+3</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.rosterBox}>
          <Text style={styles.rosterTitle}>[ {visitante.name.toUpperCase()} ]</Text>
          {visitante.players.map((player, index) => (
            <View key={index} style={styles.playerCard}>
              <Text style={styles.playerNameGame}>{player.toUpperCase()}</Text>
              <Text style={styles.individualScore}>PTS: {playerScores[player] || 0}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.pointBtn} onPress={() => sumarPuntos(player, 2)}>
                  <Text style={styles.pointBtnText}>+2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pointBtn, styles.threeBtn]} onPress={() => sumarPuntos(player, 3)}>
                  <Text style={styles.pointBtnText}>+3</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.finishBtn} onPress={finalizarPartido}>
        <Text style={styles.finishBtnText}>FINISH GAME</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  contentContainer: { alignItems: 'center', paddingVertical: 40 },
  matchTitle: { color: '#fff', fontSize: 32, fontWeight: '900', marginBottom: 20, textShadowColor: '#ff4444', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  team: { alignItems: 'center', marginHorizontal: 10 },
  matchLogo: { width: 80, height: 80, resizeMode: 'contain' },
  name: { color: '#FFD700', fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  score: { color: '#fff', fontSize: 60, fontWeight: '900', textShadowColor: '#00f2ff', textShadowRadius: 10 },
  vs: { color: '#ff4444', fontSize: 24, fontWeight: '900', fontStyle: 'italic' },
  rostersContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 5 },
  rosterBox: { width: '48%' },
  rosterTitle: { color: '#FFD700', fontSize: 12, fontWeight: '900', marginBottom: 10, textAlign: 'center' },
  playerCard: { backgroundColor: '#1a1a1a', marginBottom: 8, padding: 8, borderLeftWidth: 4, borderLeftColor: '#ff4444' },
  playerNameGame: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  individualScore: { color: '#00f2ff', fontSize: 9, marginBottom: 5, fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pointBtn: { backgroundColor: '#333', padding: 5, width: '45%', alignItems: 'center', borderWidth: 1, borderColor: '#555' },
  threeBtn: { borderColor: '#FFD700' },
  pointBtnText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  finishBtn: { backgroundColor: '#FFD700', padding: 15, width: '80%', marginTop: 30, alignItems: 'center', borderWidth: 3, borderColor: '#fff' },
  finishBtnText: { color: '#000', fontWeight: '900', fontSize: 18 }
});