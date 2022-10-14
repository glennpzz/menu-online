import React from "react";
interface Props {
  title? : String;
  desc? : String; 
  wrapHeight? : Boolean; 
  imageWidth? : String
}
const EmptyState = React.memo(({
  title = '', 
  desc = 'Belum ada menunya nih,</br>Silahkan tambahkan terlebih dahulu!', 
  wrapHeight = false, 
  imageWidth = '148px'
} : Props) => {
    return (
        <div style={{minHeight: '400px'}} className={wrapHeight ? 'container-empty d-flex justify-content-center align-items-center flex-column flex-fill py-5' : 'container-empty d-flex justify-content-center align-items-center flex-column flex-fill'}>
          <img src={require('../assets/icons/empty-menu.svg')} alt="empty" title="empty" className="img-empty h-100 mx-5 my-4" style={{width: `${imageWidth}`}}/>
          <div className="empty-text text-center">
            {title !== '' && <p className="headline6 color-green900 semibold m-0 px-3" id="title-not-found" dangerouslySetInnerHTML={{__html:title.toString()}}></p>}
            <p className="bodytext2 color-green800 semibold m-0 px-3" id="desc-not-found" dangerouslySetInnerHTML={{__html:desc.toString()}}></p>
          </div>
        </div>
    );
})
export default EmptyState;