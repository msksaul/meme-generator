import { useEffect, useState } from 'react'

import memesData from '../memesData'

const Meme = () => {

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg'
  })

  const [allMemeImages, setAllMemeImages] = useState([])

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length)
    setMeme(prev => ({
      ...prev,
      randomImage: allMemeImages[randomNumber].url
    }))
  }

  const handleChange = (event) => {
    const {value, name} = event.target
    setMeme(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes))
  }, [])

  return (
    <main>
      <div className='form'>
        <input 
          className='form--input' 
          type='text'
          placeholder='Top text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input 
          className='form--input' 
          type='text' 
          placeholder='Bottom text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button 
          className='form--button'
          onClick={getMemeImage}
        >
          Get a new meme image 🖼
        </button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} alt='meme-image' className='meme--image'/>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  )
}

export default Meme