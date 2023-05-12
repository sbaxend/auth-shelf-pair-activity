import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [name, setDescription] = useState('');
  const [url, setImage_url] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = event => {
    event.preventDefault();
    // const itemToAdd = {
    //   description,
    //   image_url
    // }
    axios.post('/api/shelf', { description: name, image_url: url }).then(response => {
      console.log(response);
      fetchShelf();
    }).catch(error => {
      console.log(`Error in POST ${error}`);
      alert('Something went wrong.');
    })
  }

//Delete button
const deleteItem = (id) => {
  axios.delete(`/api/shelf/${id}`)
  .then(response => {
    console.log(response);
    fetchShelf();
  }).catch(error => {
    console.log(`Error in delete ${error}`);
  });
}



  return (
    <div className="container">
      <h2>Shelf</h2>
      <h3>Add Item to Shelf</h3>
      <form onSubmit={addItem}>
        <label htmlFor='name'>Item Name:</label>
        <input onChange={e => setDescription(e.target.value)} type='text' id='name' placeholder='pencil' />
        <label htmlFor='desc'>Image Url:</label>
        <input onChange={e => setImage_url(e.target.value)} id='desc' type='text' placeholder='https:www.google.com...' />
        <input type='submit' value='Submit' />
      </form>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return  <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button onClick={() => deleteItem(item.id)} style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                  </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
