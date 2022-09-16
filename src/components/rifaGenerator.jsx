import React from 'react'
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '../assets/images/Scan.png'})`
  },
  section: {
    margin: '5px 0 0 10px',
    padding: 9.8101,
    flexGrow: 0,
    position: 'relative',
  },
  childrens: {
    margin: '200px 0 0 0'
  },
  viewer: {
    width: '100%',
    height: '650px'
  },
  first: {
    padding: '20px 0 0 125px',
    fontSize: '9px'
  },
  text: {
    padding: '2px 0 20px 125px',
    fontSize: '9px'
  },
  nextText: {
    margin: '0 0 0 125px',
    padding: '0 0 0 125px',
    fontSize: '9px'
  },
  textDown: {
    margin: '-14px -20px 20px 0',
    fontSize: "9px"
  },
  textFix: {
    margin: '5px -20px 20px 0',
    fontSize: '9px'
  },
  textSmall: {
    margin: '-17px -20px 20px 0',
    fontSize: '9px'
  },
  textTaquilla: {
    margin: '-20px -20px 20px 0',
    fontSize: '9px'
  },
  small: { 
    margin: '8% 0 0 10px'
  },
  smallF: { 
    margin: '5% 0 0 10px'
  },
  wrapped: { 
    margin: '24px 0 0 10px'
  },
  nosigno: {
    margin: '10px 0 0 160px',
    fontSize: '9px'
  },
  colnosigno: {
    margin: '-12px 0 0 160px',
    fontSize: '9px'
  },
  third: {
    margin: '-2px -20px 20px 0',
    fontSize: '9px'
  },
});

function RifaGenerator(props) {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="letter" orientation="landscape" style={styles.page} wrap>
              <View style={styles.section} wrap>
                <Text style={styles.first}>Numero: {props.rifasNumber}      {props.price}$                                                                        <Text style={styles.first}>Numero: {props.rifasNumber}      {props.price}$</Text>                                                                             <Text style={styles.first}>Numero: {props.rifasNumber}      {props.price}$</Text></Text>
                <Text style={styles.nosigno}>{props.noSign}                                                                                             <Text style={styles.nosigno}>{props.noSign}</Text>                                                                                                    <Text style={styles.nosigno}>{props.noSign}</Text></Text>
                <div style={styles.smallF}>
                  <Text style={styles.textSmall}>{props.rifasTitle}                                                                                        <Text style={styles.textSmall}>{props.rifasTitle}</Text>                                                                                            <Text style={styles.textSmall}>{props.rifasTitle}</Text></Text>
                  <Text style={styles.textSmall}>Placa: {props.plate}                                                                              <Text style={styles.textSmall}>Placa: {props.plate}</Text>                                                                                 <Text style={styles.textSmall}>Placa: {props.plate}</Text></Text>
                  <Text style={styles.textSmall}>Año: {props.year}                                                                                        <Text style={styles.textSmall}>Año: {props.year}</Text>                                                                                           <Text style={styles.textSmall}>Año: {props.year}</Text></Text>
                  <Text style={styles.textTaquilla}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}                             <Text style={styles.textTaquilla}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text>                                <Text style={styles.textTaquilla}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text></Text>
                </div>
              </View>
              <View style={styles.section} wrap>
                <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$                                                                        <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text>                                                                             <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text></Text>
                <Text style={styles.colnosigno}>{props.noSign}                                                                                             <Text style={styles.colnosigno}>{props.noSign}</Text>                                                                                                    <Text style={styles.colnosigno}>{props.noSign}</Text></Text>
                <div style={styles.wrapped}>
                  <Text style={styles.textFix}>{props.rifasTitle}                                                                                        <Text style={styles.textFix}>{props.rifasTitle}</Text>                                                                                            <Text style={styles.textFix}>{props.rifasTitle}</Text></Text>
                  <Text style={styles.textSmall}>Placa: {props.plate}                                                                              <Text style={styles.textSmall}>Placa: {props.plate}</Text>                                                                                 <Text style={styles.textSmall}>Placa: {props.plate}</Text></Text>
                  <Text style={styles.textSmall}>Año: {props.year}                                                                                        <Text style={styles.textSmall}>Año: {props.year}</Text>                                                                                           <Text style={styles.textSmall}>Año: {props.year}</Text></Text>
                  <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}                             <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text>                                <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text></Text>
                </div>
              </View>
              <View style={styles.section} wrap>
                <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$                                                                        <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text>                                                                             <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text></Text>
                <Text style={styles.colnosigno}>{props.noSign}                                                                                             <Text style={styles.colnosigno}>{props.noSign}</Text>                                                                                                    <Text style={styles.colnosigno}>{props.noSign}</Text></Text>
                <div style={styles.wrapped}>
                  <Text style={styles.textDown}>{props.rifasTitle}                                                                                        <Text style={styles.textDown}>{props.rifasTitle}</Text>                                                                                            <Text style={styles.textDown}>{props.rifasTitle}</Text></Text>
                  <Text style={styles.textSmall}>Placa: {props.plate}                                                                              <Text style={styles.textSmall}>Placa: {props.plate}</Text>                                                                                 <Text style={styles.textSmall}>Placa: {props.plate}</Text></Text>
                  <Text style={styles.textSmall}>Año: {props.year}                                                                                        <Text style={styles.textSmall}>Año: {props.year}</Text>                                                                                           <Text style={styles.textSmall}>Año: {props.year}</Text></Text>
                  <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}                             <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text>                                <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text></Text>
                </div>
              </View>
              <View style={styles.section} wrap>
                <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$                                                                        <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text>                                                                             <Text style={styles.text}>Numero: {props.rifasNumber}      {props.price}$</Text></Text>
                <Text style={styles.colnosigno}>{props.noSign}                                                                                             <Text style={styles.colnosigno}>{props.noSign}</Text>                                                                                                    <Text style={styles.colnosigno}>{props.noSign}</Text></Text>
                <div style={styles.wrapped}>
                  <Text style={styles.third}>{props.rifasTitle}                                                                                        <Text style={styles.third}>{props.rifasTitle}</Text>                                                                                            <Text style={styles.third}>{props.rifasTitle}</Text></Text>
                  <Text style={styles.textSmall}>Placa: {props.plate}                                                                              <Text style={styles.textSmall}>Placa: {props.plate}</Text>                                                                                 <Text style={styles.textSmall}>Placa: {props.plate}</Text></Text>
                  <Text style={styles.textSmall}>Año: {props.year}                                                                                        <Text style={styles.textSmall}>Año: {props.year}</Text>                                                                                           <Text style={styles.textSmall}>Año: {props.year}</Text></Text>
                  <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}                             <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text>                                <Text style={styles.textSmall}>{props.taquilla}                {props.date.split('-').join('/')}   {props.time.substring(11, 16)}</Text></Text>
                </div>
              </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default RifaGenerator