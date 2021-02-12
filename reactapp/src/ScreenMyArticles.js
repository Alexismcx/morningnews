import React from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;





function ScreenMyArticles(props) {
  var noArticles

  if (props.myArticles == 0) {
    console.log("salut");
    noArticles = <div style={{ marginTop: "30px", textAlign: 'center'}}>No articles</div>
  }

  const articleList = props.myArticles.map((article, i) => {
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
            <Icon type="read" key="ellipsis2" />,
            <Icon type="delete" key="ellipsis" onClick={() => props.deleteToWishList(article.title)} />
          ]}
        >
          <Meta
            title={article.title}
            description={article.description}
          />
        </Card>
      </div>
    )

  })


  


return (
  <div>
    <Nav />
    <div className="Banner" />
    {noArticles}

    <div className="Card">
      {articleList}
    </div>
  </div>
)
}


function mapStateToProps(state) {
  return { myArticles: state.whishList }
}


function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({ type: 'deleteArticle', title: articleTitle })
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
  null
)(ScreenMyArticles);


