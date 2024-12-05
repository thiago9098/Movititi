
import React,  { useState, useEffect,  createRef, createContext, useRef } from 'react';
import {  StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';


// import io from  './assets/socket.io';
// import SocketIoClient from 'socket.io-client' 


export default function App() {


  const [location, setLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [rotas, setRotas] = useState([]);
  
  const [stopEvent, setStopEvent] = useState(false);
  
  const [selected, setSelected] = useState({});


  const [linhas, setLinhas] = useState([
    {key:"8f6v", idLinha:"304", value:"304 - Pinhais / Campo Comprido"},
    {key:"8fgb", idLinha:"607", value:"607 - Colombo / CIC"},
    {key:"8fiq", idLinha:"702", value:"702 - Cachoeira / Caiuá"},
    {key:"b8qs", idLinha:"A01", value:"A01 - Cachoeira / Curitiba"},
    {key:"b8sr", idLinha:"A04", value:"A04 - Tamandaré / Cabral (Linha Direta)"},
    {key:"b8s7", idLinha:"A05", value:"A05 - Madrugueiro Tamandaré / Curitiba"},
    {key:"b8v5", idLinha:"A06", value:"A06 - Tamandaré / Guadalupe (via Rodovia dos Minérios)"},
    {key:"b8rd", idLinha:"A07", value:"A07 - Tamandaré / Praça 19 (Lamenha)"},
    {key:"d4ce", idLinha:"A11", value:"A11 - San Francisco (ATENDIMENTO PROVISÓRIO VILA PRADO)"},
    {key:"b948", idLinha:"A12", value:"A12 - Jardim Monte Santo (via São Jorge)"},
    {key:"b8sn", idLinha:"A14", value:"A14 - Circular Jardim Gramados / São Venâncio"},
    {key:"b8sq", idLinha:"A16", value:"A16 - Giannini"},
    {key:"b8up", idLinha:"A18", value:"A18 - Tamandaré / Cabral"},
    {key:"d4cq", idLinha:"A21", value:"A21 - Jardim Paraíso / Tamandaré"},
    {key:"b8qd", idLinha:"A22", value:"A22 - Tanguá / Tamandaré"},
    {key:"b93l", idLinha:"A23", value:"A23 - San Francisco / Jardim Paraíso"},
    {key:"b8tg", idLinha:"A31", value:"A31 - Jardim Graziela"},
    {key:"b8vv", idLinha:"A32", value:"A32 - Vila Prado"},
    {key:"b93u", idLinha:"A72", value:"A72 - Jardim Paraíso / Praça 19"},
    {key:"b964", idLinha:"A73", value:"A73 - Jardim Marrocos / Praça 19"},
    {key:"b94f", idLinha:"A77", value:"A77 - Tanguá / Praça 19"},
    {key:"b93r", idLinha:"A78", value:"A78 - Vila Marta / Praça 19"},
    {key:"b960", idLinha:"A80", value:"A80 - Tanguá - Vila Marta / Praça 19"},
    {key:"b8tl", idLinha:"B02", value:"B02 - Maracanã / Cabral"},
    {key:"b98q", idLinha:"B03", value:"B03 - Guaraituba / Alto da XV (via Maracanã)"},
    {key:"b8ri", idLinha:"B05", value:"B05 - Guaraituba / Cabral"},
    {key:"e6mj", idLinha:"B06", value:"B06 - Guaraituba / Guadalupe (via Maracanã - SEMIDIRETO)"},
    {key:"b95s", idLinha:"B07", value:"B07 - Guaraituba / Cabral (Linha Direta via Maracanã)"},
    {key:"b8pv", idLinha:"B11", value:"B11 - Maracanã / Santa Cândida"},
    {key:"b8qr", idLinha:"B13", value:"B13 - Jardim das Graças"},
    {key:"b8ut", idLinha:"B14", value:"B14 - Planalto"},
    {key:"b8sd", idLinha:"B15", value:"B15 - Ana Terra via Adriane"},
    {key:"ika7", idLinha:"B16", value:"B16 - Adriane"},
    {key:"b8q5", idLinha:"B17", value:"B17 - Santa Helena"},
    {key:"b8r5", idLinha:"B18", value:"B18 - Roseira"},
    {key:"b8vt", idLinha:"B20", value:"B20 - Guaraituba / Cabral (via Maracanã)"},
    {key:"b8ta", idLinha:"B22", value:"B22 - Paloma"},
    {key:"b8ua", idLinha:"B23", value:"B23 - Guaraituba"},
    {key:"ff6b", idLinha:"B24", value:"B24 - Colônia Faria"},
    {key:"b8sc", idLinha:"B25", value:"B25 - Maracanã / Bairro Alto"},
    {key:"b8qc", idLinha:"B26", value:"B26 - Jardim Eucaliptos"},
    {key:"b8s3", idLinha:"B28", value:"B28 - Vila Maria do Rosário"},
    {key:"b8pu", idLinha:"B29", value:"B29 - Roça Grande / APDEC (via Maracanã)"},
    {key:"ika6", idLinha:"B30", value:"B30 - Ana Terra"},
    {key:"b8uk", idLinha:"B33", value:"B33 - Bocaiúva do Sul"},
    {key:"ff6c", idLinha:"B37", value:"B37 - Vale das Flores"},
    {key:"b913", idLinha:"B38", value:"B38 - São Dimas"},
    {key:"b966", idLinha:"B39", value:"B39 - Campo Alto / Capela do Atuba / Santa Cândida"},
    {key:"b8vi", idLinha:"B41", value:"B41 - Maracanã / Capão da Imbuia"},
    {key:"b8s2", idLinha:"B42", value:"B42 - Maracanã / PUC (via Fagundes Varela)"},
    {key:"b910", idLinha:"B43", value:"B43 - Rio Verde / Boa Vista"},
    {key:"b95b", idLinha:"B44", value:"B44 - Vila Zumbi / Guaraituba"},
    {key:"b98d", idLinha:"B45", value:"B45 - Belo Rincão / Maracanã (Palmares)"},
    {key:"b96g", idLinha:"B46", value:"B46 - Colônia Faria / Vale das Flores"},
    {key:"b92k", idLinha:"B56", value:"B56 - Ana Terra via Adriane / Jardim Eucaliptos"},
    {key:"b915", idLinha:"B57", value:"B57 - Campo Alto / Santa Cândida (Circular)"},
    {key:"b908", idLinha:"B58", value:"B58 - Maracanã / Santa Cândida (Circular)"},
    {key:"b91p", idLinha:"B59", value:"B59 - Planalto / Guaraituba"},
    {key:"b8ra", idLinha:"B69", value:"B69 - Madrugueiro São Dimas / Curitiba"},
    {key:"jco9", idLinha:"B72", value:"B72 - Terminal Colombo / Terminal Guadalupe (via Terminal Roça Grande)"},
    {key:"b955", idLinha:"B73", value:"B73 - Jardim Osasco / Guadalupe"},
    {key:"b951", idLinha:"B76", value:"B76 - São Sebastião / Guadalupe"},
    {key:"b91h", idLinha:"B78", value:"B78 - São Gabriel / Guadalupe"},
    {key:"bmh4", idLinha:"B89", value:"B89 - Guaraituba / Guadalupe (via Maracanã - Cabral)"},
    {key:"b947", idLinha:"B90", value:"B90 - Paloma / Colônia Faria"},
    {key:"b97i", idLinha:"B91", value:"B91 - Vale das Flores / Roseira"},
    {key:"b8q2", idLinha:"C01", value:"C01 - Pinhais / Rui Barbosa"},
    {key:"b8q6", idLinha:"C03", value:"C03 - Pinhais / Guadalupe"},
    {key:"b946", idLinha:"C04", value:"C04 - Terminal Pinhais / Terminal Capão da Imbuia"},
    {key:"b8r6", idLinha:"C05", value:"C05 - Direto Capão da Imbuia"},
    {key:"b8v3", idLinha:"C11", value:"C11 - Jardim Holandês"},
    {key:"b900", idLinha:"C12", value:"C12 - Vila Nova"},
    {key:"b8th", idLinha:"C13", value:"C13 - Água Clara"},
    {key:"b8ue", idLinha:"C15", value:"C15 - Weissópolis"},
    {key:"b8sh", idLinha:"C17", value:"C17 - Vila Maria Antonieta"},
    {key:"b8qe", idLinha:"C18", value:"C18 - Jardim Tropical (via Vargem Grande)"},
    {key:"b8rf", idLinha:"C20", value:"C20 - Jardim Claudia"},
    {key:"b8s5", idLinha:"C22", value:"C22 - Planta Karla"},
    {key:"b8uc", idLinha:"C25", value:"C25 - Vila Amélia"},
    {key:"b8vl", idLinha:"C27", value:"C27 - Joaquina"},
    {key:"b8sv", idLinha:"C28", value:"C28 - Jacob Macanhan"},
    {key:"b988", idLinha:"C29", value:"C29 - Privê / Tarumã"},
    {key:"b98i", idLinha:"C36", value:"C36 - Pinhais / Centenário / Bairro Alto"},
    {key:"b974", idLinha:"C38", value:"C38 - Pinhais / Centenário - Jardim Tropical via Vargem Grande"},
    {key:"b96o", idLinha:"C39", value:"C39 - Maria Antonieta / Weissópolis"},
    {key:"b8rn", idLinha:"C41", value:"C41 - Pinhais / Bairro Alto (Emiliano Perneta)"},
    {key:"b8ro", idLinha:"C66", value:"C66 - Vila Zumbi / Curitiba (Circular)"},
    {key:"b8u9", idLinha:"C72", value:"C72 - Vila Palmital / Curitiba (via Conjunto Atuba)"},
    {key:"huml", idLinha:"D01", value:"D01 - Piraquara / Santos Andrade (via Terminal São Roque)"},
    {key:"humm", idLinha:"D02", value:"D02 - Terminal São Roque / Praça Santos Andrade"},
    {key:"b96c", idLinha:"D11", value:"D11 - Planta Deodoro"},
    {key:"b95r", idLinha:"D12", value:"D12 - São Cristóvão"},
    {key:"hv8f", idLinha:"D13", value:"D13 - São Tiago (via Nova Tirol)"},
    {key:"hvbc", idLinha:"D15", value:"D15 - Vila Franca"},
    {key:"b936", idLinha:"D17", value:"D17 - Roseira / Sanepar"},
    {key:"b934", idLinha:"D18", value:"D18 - Planta Deodoro / São Cristóvão"},
    {key:"i2u7", idLinha:"D20", value:"D20 - Terminal Central / Terminal São Roque"},
    {key:"i17j", idLinha:"D21", value:"D21 - Santa Mônica"},
    {key:"b8v9", idLinha:"D22", value:"D22 - Guarituba"},
    {key:"b904", idLinha:"D23", value:"D23 - Vila Macedo / Vila Militar"},
    {key:"b8qg", idLinha:"D31", value:"D31 - Bela Vista"},
    {key:"i2u8", idLinha:"D61", value:"D61 - Terminal Central Piraquara / Praça Santos Andrade"},
    {key:"i6oa", idLinha:"D66", value:"D66 - Direto Piraquara"},
    {key:"b90j", idLinha:"D69", value:"D69 - Madrugueiro Piraquara / Curitiba"},
    {key:"hump", idLinha:"D97", value:"D97 - São Tiago / Bela Vista / Nova Tirol"},
    {key:"b962", idLinha:"E01", value:"E01 - Urano / Guadalupe"},
    {key:"b918", idLinha:"E03", value:"E03 - Afonso Pena / Guadalupe"},
    {key:"bevo", idLinha:"E07", value:"E07 - Direto São José"},
    {key:"b96d", idLinha:"E11", value:"E11 - Terminal Afonso Pena / Terminal Boqueirão"},
    {key:"b8vb", idLinha:"E21", value:"E21 - Centro São José / Terminal Boqueirão"},
    {key:"b94v", idLinha:"E32", value:"E32 - Aeroporto / Terminal Boqueirão"},
    {key:"b90a", idLinha:"E67", value:"E67 - Braga / Curitiba via Ouro Fino"},
    {key:"b92n", idLinha:"E68", value:"E68 - Quississana / Guadalupe"},
    {key:"b95h", idLinha:"E71", value:"E71 - Jardim Ipê / Guadalupe"},
    {key:"b90e", idLinha:"E72", value:"E72 - Jardim Izaura / Guadalupe"},
    {key:"b92o", idLinha:"E73", value:"E73 - Jardim Cruzeiro / Curitiba"},
    {key:"b94h", idLinha:"E76", value:"E76 - Posto Paris / Guadalupe"},
    {key:"b90n", idLinha:"E77", value:"E77 - Guatupê / Curitiba via Jardim Cristal"},
    {key:"b92v", idLinha:"E78", value:"E78 - Roseira / Curitiba"},
    {key:"b98f", idLinha:"E79", value:"E79 - Jardim Izaura / Guadalupe via Jardim Ipê"},
    {key:"b97g", idLinha:"E99", value:"E99 - São José dos Pinhais / Guadalupe (via Terminal Central)"},
    {key:"b8sb", idLinha:"F01", value:"F01 - Fazenda / Pinheirinho"},
    {key:"b8rq", idLinha:"F02", value:"F02 - Fazenda Rio Grande / Curitiba"},
    {key:"b8q8", idLinha:"F03", value:"F03 - Fazenda (Direto)"},
    {key:"b8r7", idLinha:"F05", value:"F05 - Fazenda / CIC"},
    {key:"b8uf", idLinha:"F12", value:"F12 - Iguaçu I"},
    {key:"b8rt", idLinha:"F13", value:"F13 - Estados I"},
    {key:"b8tj", idLinha:"F14", value:"F14 - Santa Maria"},
    {key:"b8rh", idLinha:"F15", value:"F15 - Gralha Azul"},
    {key:"b8s1", idLinha:"F16", value:"F16 - Nações I"},
    {key:"b8q0", idLinha:"F17", value:"F17 - Eucaliptos I"},
    {key:"b8qk", idLinha:"F18", value:"F18 - Parque Industrial"},
    {key:"b8ur", idLinha:"F19", value:"F19 - Santa Terezinha"},
    {key:"b8vm", idLinha:"F21", value:"F21 - Iguaçu II"},
    {key:"b8t3", idLinha:"F22", value:"F22 - Nações II"},
    {key:"b96b", idLinha:"F23", value:"F23 - Estados II"},
    {key:"b8u7", idLinha:"F24", value:"F24 - Eucaliptos II via Greenfield"},
    {key:"b8v1", idLinha:"F25", value:"F25 - Veneza / Pedágio"},
    {key:"b8vs", idLinha:"F26", value:"F26 - Santa Terezinha / Ipê"},
    {key:"b97o", idLinha:"F30", value:"F30 - Gralha Azul II"},
    {key:"ffq5", idLinha:"F32", value:"F32 - Jardim Brasil"},
    {key:"e6mk", idLinha:"F71", value:"F71 - Fazenda / Guadalupe"},
    {key:"b956", idLinha:"F73", value:"F73 - Fazenda Rio Grande / Areia Branca"},
    {key:"b929", idLinha:"G11", value:"G11 - Quitandinha / Pinheirinho"},
    {key:"b93e", idLinha:"G71", value:"G71 - Mandirituba / Curitiba"},
    {key:"b91n", idLinha:"G72", value:"G72 - Areia Branca / Rui Barbosa"},
    {key:"b8un", idLinha:"H01", value:"H01 - Araucária / Guadalupe"},
    {key:"b8vh", idLinha:"H02", value:"H02 - Araucária / Capão Raso"},
    {key:"b8qn", idLinha:"H11", value:"H11 - Araucária / Pinheirinho"},
    {key:"b8q3", idLinha:"H12", value:"H12 - Araucária / Portão"},
    {key:"b91i", idLinha:"H20", value:"H20 - Angélica / Capão Raso"},
    {key:"b943", idLinha:"H24", value:"H24 - Terminal Angélica / Terminal Pinheirinho (Direto)"},
    {key:"b8qm", idLinha:"H97", value:"H97 - Angélica / Guadalupe"},
    {key:"e1op", idLinha:"I11", value:"I11 - Araucária / Fazenda Rio Grande"},
    {key:"humn", idLinha:"I14", value:"I14 - Piraquara / Pinhais (via Guarituba) - T. São Roque/T. Pinhais"},
    {key:"humo", idLinha:"I17", value:"I17 - T. São Roque / T. Pinhais"},
    {key:"b8u4", idLinha:"I20", value:"I20 - Maracanã / Afonso Pena"},
    {key:"b92s", idLinha:"I21", value:"I21 - Piên / Fazenda Rio Grande (via Agudos do Sul)"},
    {key:"b90g", idLinha:"I30", value:"I30 - Campo Largo / Balsa Nova"},
    {key:"b95k", idLinha:"I32", value:"I32 - Araucária / Campo Largo"},
    {key:"fp3a", idLinha:"I33", value:"I33 - Jardim Paulista / Guaraituba"},
    {key:"b94s", idLinha:"I40", value:"I40 - Quatro Barras / Piraquara"},
    {key:"b940", idLinha:"I50", value:"I50 - Quatro Barras / Jardim Paulista"},
    {key:"b980", idLinha:"I60", value:"I60 - Piraquara / São José dos Pinhais (São Roque/Afonso Pena)"},
    {key:"b95i", idLinha:"I71", value:"I71 - Itaperuçu / Rio Branco"},
    {key:"b911", idLinha:"I90", value:"I90 - Terminal Cachoeira / Terminal Maracanã"},
    {key:"b938", idLinha:"I91", value:"I91 - Colombo / Tamandaré"},
    {key:"b8vg", idLinha:"J02", value:"J02 - Campo Largo / Campina do Siqueira"},
    {key:"b8st", idLinha:"J12", value:"J12 - Rebouças / Timbotuva"},
    {key:"b8u5", idLinha:"J16", value:"J16 - Santa Ângela"},
    {key:"b8rj", idLinha:"J17", value:"J17 - Dom Pedro II / Campo Comprido"},
    {key:"b8um", idLinha:"J18", value:"J18 - Dona Fina"},
    {key:"b937", idLinha:"J20", value:"J20 - Vila Torres"},
    {key:"b92q", idLinha:"J62", value:"J62 - Campo Largo / Guadalupe"},
    {key:"b96a", idLinha:"J71", value:"J71 - Itambé"},
    {key:"bvk1", idLinha:"J99", value:"J99 - Tubo Ferrari / Hospital do Rocio"},
    {key:"b92e", idLinha:"K01", value:"K01 - Itaperuçu / Guadalupe (Tamandaré - Minérios)"},
    {key:"b8qv", idLinha:"K11", value:"K11 - Itaperuçu / Tamandaré"},
    {key:"b91m", idLinha:"K71", value:"K71 - Itaperuçu / Praça 19"},
    {key:"b942", idLinha:"K72", value:"K72 - Direto Itaperuçu (Não para na Rodovia)"},
    {key:"b958", idLinha:"L01", value:"L01 - Rio Branco do Sul / Praça 19 (Tamandaré - Lamenha)"},
    {key:"b8sf", idLinha:"L11", value:"L11 - Rio Branco do Sul / Tamandaré"},
    {key:"b92d", idLinha:"L71", value:"L71 - Rio Branco do Sul / Praça 19"},
    {key:"b95p", idLinha:"L72", value:"L72 - Direto Rio Branco (Não para na Rodovia)"},
    {key:"b96k", idLinha:"L79", value:"L79 - Rio Branco do Sul / Praça 19 (via Tamandaré)"},
    {key:"bn2j", idLinha:"N01", value:"N01 - Jardim Paulista / Fagundes Varela (Linha Verde)"},
    {key:"b969", idLinha:"N11", value:"N11 - Sede / Jardim Paulista"},
    {key:"b984", idLinha:"N12", value:"N12 - Eugênia Maria"},
    {key:"b98v", idLinha:"N24", value:"N24 - João Paulo II / Área Industrial"},
    {key:"b96j", idLinha:"N62", value:"N62 - Jardim Paulista / Guadalupe"},
    {key:"b98o", idLinha:"N63", value:"N63 - Eugênia Maria / Guadalupe"},
    {key:"droo", idLinha:"N73", value:"N73 - Jardim Paulista - Quatro Barras / Guadalupe"},
    {key:"dlmm", idLinha:"O11", value:"O11 - Borda do Campo"},
    {key:"dlmn", idLinha:"O12", value:"O12 - Menino Deus / São Pedro"},
    {key:"b906", idLinha:"O13", value:"O13 - Palmital / Ribeirão do Tigre"},
    {key:"dlmo", idLinha:"O14", value:"O14 - Santa Luzia"},
    {key:"eev9", idLinha:"O15", value:"O15 - Joião da Cidadania"},
    {key:"b983", idLinha:"O31", value:"O31 - Quatro Barras / Santa Cândida (Hospital Angelina Caron)"},
    {key:"b932", idLinha:"O69", value:"O69 - Madrugueiro Quatro Barras / Curitiba"},
    {key:"dron", idLinha:"O74", value:"O74 - Quatro Barras / Guadalupe"},
    {key:"b95c", idLinha:"P01", value:"P01 - Campo Magro / Curitiba"},
    {key:"b8ug", idLinha:"P11", value:"P11 - Campo Magro"},
    {key:"b94k", idLinha:"P12", value:"P12 - Campo Magro (São Benedito)"},
    {key:"b8rs", idLinha:"P13", value:"P13 - Bom Pastor"},
    {key:"b8q9", idLinha:"P14", value:"P14 - Jardim Boa Vista"},
    {key:"b8se", idLinha:"P15", value:"P15 - Jardim Pioneiro"},
    {key:"b95t", idLinha:"P16", value:"P16 - Jardim Boa Vista (Padre Aleixo)"},
    {key:"b95m", idLinha:"P17", value:"P17 - Campo Novo / Santa Felicidade (via Passauna)"},
    {key:"b914", idLinha:"P31", value:"P31 - Bateias / Campo Magro"},
    {key:"b907", idLinha:"P32", value:"P32 - Terra Boa / Campo Magro"},
    {key:"b939", idLinha:"P59", value:"P59 - Bom Pastor via Jardim Pioneiro"},
    {key:"b91s", idLinha:"P69", value:"P69 - Madrugueiro Curitiba / Campo Magro"},
    {key:"b97r", idLinha:"R11", value:"R11 - Contenda / Araucária"},
    {key:"b91a", idLinha:"R71", value:"R71 - Contenda / Curitiba"},
    {key:"b97j", idLinha:"R99", value:"R99 - Conexão Contenda"},
    {key:"b92m", idLinha:"S01", value:"S01 - Roça Grande / Guadalupe"},
    {key:"fp39", idLinha:"S11", value:"S11 - Roça Grande / Guaraituba"},
    {key:"b91r", idLinha:"S12", value:"S12 - Parque Embu"},
    {key:"b93f", idLinha:"S14", value:"S14 - Ana Rosa"},
    {key:"b95u", idLinha:"S15", value:"S15 - Santa Tereza"},
    {key:"b94r", idLinha:"S16", value:"S16 - Guaraci"},
    {key:"b941", idLinha:"S19", value:"S19 - Sede / Terminal Roça Grande"},
    {key:"b94c", idLinha:"S31", value:"S31 - Roça Grande / Santa Cândida"},
    {key:"fp3b", idLinha:"S58", value:"S58 - Circular Jardim Curitiba / Roça Grande"},
    {key:"b96t", idLinha:"S59", value:"S59 - Circular Santa Fé"},
    {key:"b98c", idLinha:"S89", value:"S89 - São Sebastião / Guadalupe via São Gabriel"},
    {key:"bumt", idLinha:"U01", value:"U01 - Sede / Maracanã"},
    {key:"bvk2", idLinha:"U02", value:"U02 - Embu / Florença"},
    {key:"bvk3", idLinha:"U05", value:"U05 - Capivari"},
    {key:"bvk4", idLinha:"U08", value:"U08 - Gruta Bacaetava"},
    {key:"bvk5", idLinha:"U11", value:"U11 - Itajacuru / Santa Gema"},
    {key:"bria", idLinha:"Y98", value:"Y98 - Ribeirão / Jardim Paulista"}
  ]);

  const mapRef = createRef();
  
//   const socket = SocketIoClient('https://transporteservico.urbs.curitiba.pr.gov.br:3000',{
//     transports: ['websocket', 'polling'],
//  });


  useEffect(() => {
    // socket.open();

    // console.log(socket);
   
    // socket.on('connect_error', (error) => {
    //   console.log('errro', error); // true
    //   // ...
    // });
    // // console.log(socket)
    // socket.on('connect', () => {
    //   console.log(socket.connected); // true
    // }); 
    // socket.on('lista 550', (a) => {console.log(a);});
    

    // socket.emit('get linha',550);

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('sem permissão')
            return;
        }
 
        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            enableHighAccuracy: true,
            timeInterval: 5
        });

        setLocation(location);

    })();


  }, []);


  const [ticking, setTicking] = useState(true),
  [count, setCount] = useState(0)
  
  useEffect(() => { 
      setStopEvent(true)

      const timer = setTimeout(() => {
        setCount(count+1)
        getData(selected).then(()=>{
          console.log('terminou');
        })
      }, 3000);

      return () => clearTimeout(timer)
  }, [count, ticking])


  function goToMyLocation () {
    setStopEvent(false)
    getRota(selected)
    // getData(selected)
      // mapRef.current.animateCamera({center: {"latitude":location.coords.latitude, "longitude": location.coords.longitude}});
  }



  function decodePolyline(encoded) {
    let index = 0;
    let lat = 0;
    let lng = 0;
    let coordinates = [];
    let shift = 0;
    let result = 0;
    let byte = null;
    let latitude_change;
    let longitude_change;
    let factor = Math.pow(10, 5);
  
    while (index < encoded.length) {
      byte = null;
      shift = 0;
      result = 0;
  
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
      shift = result = 0;
  
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
  
      lat += latitude_change;
      lng += longitude_change;
  
      coordinates.push({ latitude: lat / factor, longitude: lng / factor });
    }
  
    return coordinates;
  }

  

  function getRota(rota) {
    fetch('https://editor.mobilibus.com/web/get-route-info', {
      method: 'POST',
      body: rota.key,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
        const retorno = []
          data.forEach(element => {
            let value = element
            const valores = decodePolyline(value.shape) //value.stops.map((val)=>{return {latitude:val.lat ,longitude:val.lon } })

            retorno.push(valores)
          });
          setRotas(retorno)
       })
       .catch((err) => {
          console.log(err.message);
       });
  }


  async function getData(rota) {
    if(rota.key){
      fetch('https://editor.mobilibus.com/web/get-route-realtime-info', {
        method: 'POST',
        body: JSON.stringify(
          {"project":"190vp","route":rota.key,"stopId":0,"routeName":rota.idLinha}
        ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
            // console.log(data);
            
            setStopEvent(false)
            setVeiculos(data.vehicles)
          })
          .catch((err) => {
            setStopEvent(false)
            console.log(err.message);
         });
    }
  }


  return (
    <View style={styles.container}>

        <View style={styles.map}>
            <MapView
              provider          = {undefined}
              ref               = { mapRef }
              style             = { styles.map }
              showsUserLocation = { true } 
              initialRegion     = { location }
              styles={{ flex: 1 }}
            >
              <UrlTile
                  urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  zIndex={1}
                />
              {
                veiculos.map((value, index)=>{
                  return <Marker
                    key={value.id}
                    coordinate={{
                      latitude: value.lat,
                      longitude: value.lon,
                    }}
                    title={value.lb}
                  >
                    <View style={{flex:1}}>
                      <Ionicons name="bus" size={40} color="red" />
                      <Ionicons style={{transform: [{rotate: value.dir+'deg'}]}} name="arrow-up-circle-sharp" size={35} color="black" />
                    </View>
                  </Marker>;
                })
              }
              {
              rotas.map((value,index)=>{
                return <Polyline
                      key={index}
                      coordinates={value}
                      strokeColor="#060270" 
                      strokeColors={[
                        '#7F0000',
                        '#00000000', 
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000',
                      ]}
                      strokeWidth={2}
                    />;
                    
                  })

                }
               
               
                </MapView>
              <View style={{padding:10}}>
                <SelectList 
                    setSelected={(val) => setSelected(linhas.filter(function (i){ return i.value===val;})[0])} 
                    data={linhas} 
                    onSelect={() => goToMyLocation()} 
                    save="value"
                />
              </View>

        </View>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
