import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { TEAMS } from './teamsData';

export default function SelectionScreen({ navigation }) {
  const [localIdx, setLocalIdx] = useState(0);
  const [visitIdx, setVisitIdx] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  // Auto-ocultar el warning después de 1.5 segundos
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const siguienteEquipo = (lado) => {
    if (lado === 'local') {
      let nuevoIdx = (localIdx + 1) % TEAMS.length;
      setLocalIdx(nuevoIdx);
      // Si el nuevo equipo local coincide con el visitante, mostrar warning
      if (nuevoIdx === visitIdx) {
        setShowWarning(true);
      }
    } else {
      let nuevoIdx = (visitIdx + 1) % TEAMS.length;
      setVisitIdx(nuevoIdx);
      // Si el nuevo equipo visitante coincide con el local, mostrar warning
      if (nuevoIdx === localIdx) {
        setShowWarning(true);
      }
    }
  };

  // Verificar si los equipos son iguales
  const equiposIguales = localIdx === visitIdx;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MATCH JAM - SELECCIÓN</Text>
      
      {/* WARNING RETRO */}
      {showWarning && (
        <View style={styles.warningContainer}>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>⚠ SELECCIONADO ⚠</Text>
          </View>
        </View>
      )}
      
      <View style={styles.row}>
        {/* TARJETA LOCAL */}
        <View style={styles.card}>
          <View style={styles.innerBorder}>
            <Text style={styles.label}>[ LOCAL ]</Text>
            <Image source={{ uri: TEAMS[localIdx].logo }} style={styles.logoImage} />
            <Text style={styles.teamName}>{TEAMS[localIdx].name.toUpperCase()}</Text>
            
            <View style={styles.playerList}>
              {TEAMS[localIdx].players.map((p, index) => (
                <Text key={index} style={styles.playerName}>{`>> ${p.toUpperCase()}`}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => siguienteEquipo('local')}>
              <Text style={styles.btnText}>CAMBIAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TARJETA VISITANTE */}
        <View style={styles.card}>
          <View style={styles.innerBorder}>
            <Text style={styles.label}>[ VISIT ]</Text>
            <Image source={{ uri: TEAMS[visitIdx].logo }} style={styles.logoImage} />
            <Text style={styles.teamName}>{TEAMS[visitIdx].name.toUpperCase()}</Text>

            <View style={styles.playerList}>
              {TEAMS[visitIdx].players.map((p, index) => (
                <Text key={index} style={styles.playerName}>{`>> ${p.toUpperCase()}`}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => siguienteEquipo('visitante')}>
              <Text style={styles.btnText}>CAMBIAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.playBtn, equiposIguales && styles.playBtnDisabled]}
        onPress={() => {
          if (!equiposIguales) {
            navigation.navigate('Game', { local: TEAMS[localIdx], visitante: TEAMS[visitIdx] });
          }
        }}
        disabled={equiposIguales}
      >
        <Text style={[styles.playText, equiposIguales && styles.playTextDisabled]}>
          {equiposIguales ? '✖ MISMO EQUIPO ✖' : 'PUSH START BUTTON'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  header: { 
    color: '#FFD700', 
    fontSize: 28, 
    fontWeight: '900', 
    marginBottom: 30, 
    letterSpacing: -1,
    textShadowColor: '#ff4444',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  // ESTILOS DEL WARNING RETRO
  warningContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  warningBox: {
    backgroundColor: '#ff4444',
    borderWidth: 4,
    borderColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  warningText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  // ESTILOS ORIGINALES
  row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 4,
    borderRadius: 0,
    width: '47%', 
    borderWidth: 3,
    borderColor: '#ff4444',
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  label: { color: '#ff4444', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
  logoImage: { width: 70, height: 70, marginVertical: 10, resizeMode: 'contain' },
  teamName: { color: '#000', fontSize: 16, fontWeight: '900', marginBottom: 10, textAlign: 'center' },
  playerList: { alignSelf: 'flex-start', marginBottom: 15, width: '100%' },
  playerName: { color: '#333', fontSize: 9, fontWeight: 'bold', marginBottom: 3 },
  btn: { 
    backgroundColor: '#ff4444', 
    paddingVertical: 10, 
    width: '100%', 
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#800000'
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  playBtn: { 
    backgroundColor: '#FFD700', 
    padding: 20, 
    marginTop: 40, 
    width: '85%', 
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  playBtnDisabled: {
    backgroundColor: '#666',
    borderColor: '#444',
    opacity: 0.6,
  },
  playText: { color: 'black', fontWeight: '900', fontSize: 18 },
  playTextDisabled: {
    color: '#999',
  }
});
