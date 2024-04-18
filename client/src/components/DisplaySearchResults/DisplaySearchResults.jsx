
import'./DisplaySearchResults.css' ;
import PropTypes from "prop-types"
import Card from '../Card/Card';

export default function DisplaySearchResults ({results, inputValue, setDisplay}) {

   const disappear= () =>{
    setDisplay(false)
   }
  return (
    <div id='DisplaySearchResults'>

     
        <button  className='close-Btn' type='button' onClick={disappear}> X </button>

          { !results? <p> sorry no result for {inputValue}</p> :
          <div className='card-list'> 
          {results.map((card) =>  <Card card={card} key={card} /> )  }   
            </div>
          }    
          
         
    </div>
  )
}
DisplaySearchResults.propTypes = {
    results: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    setDisplay: PropTypes.func.isRequired,
  }


