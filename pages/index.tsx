import { Fragment, useEffect, useRef, useState } from "react";

const index = () =>
{
  const [ image, setImage ] = useState<File>( null );
  const [ prev, setPrev ] = useState<string>( null );
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect( () =>
  {
    if ( image )
    {
      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setPrev( reader.result as string );
      };
      reader.readAsDataURL( image );
    }
    else
    {
      setPrev( null );
    }
  }, [ image ] );

  return (
    <div id='container'>
      {
        prev ? <div className='prev'>
          <img src={ prev } />
          <button className='btn-small' onClick={ e => setImage( null ) }>Go Back</button>
        </div> : <button className='btn' onClick={ e =>
        {
          e.preventDefault();
          fileInputRef.current.click();
        } }>Add Image</button>
      }
      <form>
        <input type="file" style={ { display: 'none' } } ref={ fileInputRef } onChange={ e =>
        {
          setImage( e.target.files[ 0 ] );
        } } />
      </form>
    </div>
  );
};

export default index;
