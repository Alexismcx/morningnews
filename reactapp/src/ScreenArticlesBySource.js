import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav';
import {
  useParams
} from "react-router-dom";
import { Modal, Button } from 'antd';

import {connect} from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([]);

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    const load = async () => {
      var rawResponse = await fetch(`/screenarticlesbysource/${id}`)
      var response = await rawResponse.json();
      console.log(response);
      setArticleList(response.articles)
    }
    load()
  }, []);

  const style = {
    width: 300,
    margin: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }


  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  }



  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var articleMeta = articleList.map((article, i) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <Card
          style={{
            width: 300,
            margin: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          cover={
            <img
              alt="example"
              src={article.urlToImage}
            />
          }
          actions={[
            <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)} />,
            <Icon type="like" key="ellipsis" onClick={() => props.onAddToWishList(article)} />
          ]}

        >
          <Meta
            title={article.title}
            description={article.description}
          />
        </Card>
        <Modal title={title} visible={visible} mask={false} onOk={handleOk} onCancel={handleCancel}>
          <p>{content}</p>
        </Modal>
      </div>
    )
  });

  return (
      <div>
        <Nav />
        <div className="Banner" />
        <div className="Card">
          {articleMeta}
        </div>

      </div>
  );
}

function mapDispatchToProps(dispatch) {
  
  return {
    onAddToWishList: function (article) {
      dispatch({ type: 'addArticle', articleLiked: article })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenArticlesBySource);

