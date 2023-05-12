import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import ms from '../../../utils/ms';
import { colors } from '../../../utils';
import { Gap } from '../../atoms';

const ListMedia = ({med, onPress, navigation}) => {
  const dispatch = useDispatch();
  const {mediaList} = useSelector(state => state.mediaReducer);
  const [datas, setDatas] = useState();
  const [isclicked, setClicked] = useState('');

  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log('list media', med);

  // const result = (med) => {
  // let arrData = []

  //   for(let i=0 ; i < med.length; i++){
  //     // dispatch({ type: 'SET_MED', value: {...res.data[i]}});
  //     console.log('index result', i);
  //     console.log('result media', med[i]);
  //     // data = med[i]
  //     arrData.push(med[i])
  //   }

  //   return arrData
  // }

  // setDatas(result(medList));

  imageSelect = med => {
  
    const mediaArray = {
      '100kpj.com': require('../../../assets/icon/media/100kpj.png'),  
      'abadikini.com': require('../../../assets/icon/media/abadikini.png'),  
      'akurat.co': require('../../../assets/icon/media/akurat.png'),  
      'antvklik.com': require('../../../assets/icon/media/antvklik.png'),  
      'alinea.id': require('../../../assets/icon/media/alinea.png'),  
      'antaranews.com': require('../../../assets/icon/media/antaranews.png'),  
      'ayobandung.com': require('../../../assets/icon/media/ayobandung.png'),  
      'ayobogor.com': require('../../../assets/icon/media/ayobogor.png'),  
      'beritajatim.com': require('../../../assets/icon/media/beritajatim.png'),  
      'beritasatu.com': require('../../../assets/icon/media/beritasatu.png'),  
      'bisnis.com': require('../../../assets/icon/media/bisnis.png'),  
      'cnbcindonesia.com': require('../../../assets/icon/media/cnbcindonesia.png'),  
      'cnnindonesia.com': require('../../../assets/icon/media/cnnindonesia.png'),  
      'cyberthreat.id': require('../../../assets/icon/media/cyberthreat.png'),  
      'detik.com': require('../../../assets/icon/media/detik.png'),  
      'dream.co.id': require('../../../assets/icon/media/dream.png'),  
      'elshinta.com': require('../../../assets/icon/media/elshinta.png'),  
      'era.id': require('../../../assets/icon/media/era.png'),  
      'faktualnews.co': require('../../../assets/icon/media/faktualnews.png'),  
      'fajar.co.id': require('../../../assets/icon/media/fajar.png'),  
      'fin.co.id': require('../../../assets/icon/media/fin.png'),  
      'galamedianews.com': require('../../../assets/icon/media/galamedianews.png'),  
      'gatra.com': require('../../../assets/icon/media/gatra.png'),  
      'gelora.co': require('../../../assets/icon/media/gelora.png'),  
      'genpi.co': require('../../../assets/icon/media/genpi.png'),  
      'gonews.co': require('../../../assets/icon/media/gonews.png'),  
      'goriau.com': require('../../../assets/icon/media/goriau.png'),  
      'harianjogja.com': require('../../../assets/icon/media/harianjogja.png'),  
      'idntimes.com': require('../../../assets/icon/media/idntimes.png'),  
      'idtoday.co': require('../../../assets/icon/media/idtoday.png'),  
      'idxchannel.com': require('../../../assets/icon/media/idxchannel.png'),
      'indonesiainside.id': require('../../../assets/icon/media/indonesiainside.png'),  
      'indozone.id': require('../../../assets/icon/media/indozone.png'),  
      'industry.co.id': require('../../../assets/icon/media/industry.png'),  
      'inews.id': require('../../../assets/icon/media/inews.png'),  
      'infobanknews.com': require('../../../assets/icon/media/infobanknews.png'),  
      'inilah.com': require('../../../assets/icon/media/inilah.png'),  
      'infosurabaya.id': require('../../../assets/icon/media/infosurabaya.png'),  
      'jabarekspres.com': require('../../../assets/icon/media/jabarekspres.png'),  
      'jawapos.com': require('../../../assets/icon/media/jawapos.png'),  
      'jitunews.com': require('../../../assets/icon/media/jitunews.png'),  
      'jpnn.com': require('../../../assets/icon/media/jpnn.png'),  
      'jurnas.com': require('../../../assets/icon/media/jurnas.png'),  
      'katadata.co.id': require('../../../assets/icon/media/katadata.png'),  
      'lokadata.co': require('../../../assets/icon/media/lokadata.png'),  
      'kabartangsel.com': require('../../../assets/icon/media/kabartangsel.png'),  
      'kompas.com': require('../../../assets/icon/media/kompas.png'),  
      'kontan.co.id': require('../../../assets/icon/media/kontan.png'),  
      'koran-jakarta.com': require('../../../assets/icon/media/koran-jakarta.png'),  
      'krjogja.com': require('../../../assets/icon/media/krjogja.png'),  
      'kumparan.com': require('../../../assets/icon/media/kumparan.png'),  
      'law-justice.co': require('../../../assets/icon/media/law-justice.png'),  
      'liputan6.com': require('../../../assets/icon/media/liputan6.png'),  
      'medcom.id': require('../../../assets/icon/media/medcom.png'),  
      'mediaindonesia.com': require('../../../assets/icon/media/mediaindonesia.png'),  
      'merahputih.com': require('../../../assets/icon/media/jitunews.png'),  
      'merdeka.com': require('../../../assets/icon/media/merdeka.png'),  
      'okezone.com': require('../../../assets/icon/media/okezone.png'),  
      'oposisicerdas.com': require('../../../assets/icon/media/oposisicerdas.png'),  
      'pikiran-rakyat.com': require('../../../assets/icon/media/pikiran-rakyat.png'),  
      'pinterpolitik.com': require('../../../assets/icon/media/pinterpolitik.png'),  
      'pkb.id': require('../../../assets/icon/media/pkb.png'),  
      'pojoksatu.id': require('../../../assets/icon/media/pojoksatu.png'),  
      'poros.id': require('../../../assets/icon/media/poros.png'),  
      'prfmnews.id': require('../../../assets/icon/media/prfmnews.png'),  
      'radarbangsa.com': require('../../../assets/icon/media/radarbangsa.png'),  
      'rakyatku.com': require('../../../assets/icon/media/rakyatku.png'),  
      'republika.co.id': require('../../../assets/icon/media/republika.png'),  
      'riau24.com': require('../../../assets/icon/media/riau24.png'),  
      'netralnews.com': require('../../../assets/icon/media/netralnews.png'),  
      'rilis.id': require('../../../assets/icon/media/rilis.png'),  
      'rm.id': require('../../../assets/icon/media/rm.png'),  
      'rmco.id': require('../../../assets/icon/media/rmco.png'),  
      'rmol.id': require('../../../assets/icon/media/rmol.png'),  
      'rri.co.id': require('../../../assets/icon/media/rri.png'),  
      'sindonews.com': require('../../../assets/icon/media/sindonews.png'),  
      'solopos.com': require('../../../assets/icon/media/solopos.png'),  
      'suara.com': require('../../../assets/icon/media/suara.png'),  
      'suaramerdeka.com': require('../../../assets/icon/media/suaramerdeka.png'),  
      'suarasurabaya.net': require('../../../assets/icon/media/suarasurabaya.png'),  
      'sumber.com': require('../../../assets/icon/media/sumber.png'),  
      'sumutpos.co': require('../../../assets/icon/media/sumutpos.png'),  
      'tagar.id': require('../../../assets/icon/media/tagar.png'),  
      'tempo.co': require('../../../assets/icon/media/tempo.png'),  
      'terkini.id': require('../../../assets/icon/media/terkini.png'),  
      'thejakartapost.com': require('../../../assets/icon/media/thejakartapost.png'),  
      'timesindonesia.co.id': require('../../../assets/icon/media/timesindonesia.png'),  
      'tirto.id': require('../../../assets/icon/media/tirto.png'),  
      'tribunnews.com': require('../../../assets/icon/media/tribunnews.png'),  
      'tvonenews.com': require('../../../assets/icon/media/tvonenews.png'),  
      'vivanews.com': require('../../../assets/icon/media/vivanews.png'),  
      'wartaekonomi.co.id': require('../../../assets/icon/media/wartaekonomi.png'),  
    }
  
    return mediaArray[med];

  };

  return (
    <View style={[ms.containerPage, ms.mgH(20), ms.mgT(12)]}>
      <TouchableOpacity onPress={onPress} style={[ms.row, ms.ai('center'),]}>
        <Image source={imageSelect(med)} style={[ms.width(24), ms.height(24), ms.mgR(10)]}/>
        <Text style={[ms.fzBC(14, '400', colors.black)]}>{med}</Text>
      </TouchableOpacity>

      <View style={[ms.mgH(5), ms.pdT(15)]}>
          <Gap height={1} backgroundColor={colors.grey3}/>
        </View>
    </View>
  );
};

export default ListMedia;

const styles = StyleSheet.create({});
