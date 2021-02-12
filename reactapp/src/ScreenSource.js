import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)

  useEffect(() => {
    const load = async () => {
      var langue = 'fr'
      var country = 'fr'
        
      if(selectedLang == 'en'){
         langue = 'en'
         country = 'gb'
      }
      props.changeLang(selectedLang)


      var rawResponse = await fetch(`/screensource/${langue}/${country}`)
      var response = await rawResponse.json();
      setSourceList(response.sources)
    }
    load()
  }, [selectedLang]);


  return (
    <div>
      <Nav />

      <div className="Banner" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src="../images/fr.png" style={{width: 60, marginRight: 20}} onClick={() => setSelectedLang("fr")}></img>
        <img src="../images/uk.png" style={{width: 60}} onClick={() => setSelectedLang("en")}></img>
      </div>

      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${item.category}.png`} />}
                title={<Link to={`/screenarticlesbysource/${item.id}`} >{item.name}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />


      </div>

    </div>
  );
}

function mapStateToProps(state){
  return {selectedLang: state.selectedLang}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
