import React, {useState} from "react";
import "antd/dist/antd.css";
import styled from 'styled-components';
import {Modal, Button} from "antd";
import PDF from "react-pdf-js";

const Styles = styled.div`
    .pdfWrapper { 
        display: flex; 
        alinhar-itens: centro; 
        justificar o conteúdo: centro; 
        overflow-x: automático; 
    }
`;

const PdfViewer = ({pdf, onCancel, visible})=> {
   const [page, setPage] = useState(1);
   const [pages, setPages] = useState(null);
   const onDocumentError = (err) => {
      console.error('pdf viewer error:', err);
   }
   const onDocumentComplete = (numPages) =>{
      setPages(numPages)
   }
    return( 
            <Modal visible={visible}
                    onCancel={onCancel}
                    maskClosable={false}
                    style={{top: 20}}
                    width={"50%"}         
            >
                <PDF file="https://enapp.desenvolvimento.gov.ao/api/uploads/6030dabab43f9-PROJECTO.pdf"
                    page={page}
                    onDocumentError={onDocumentError}
                    onDocumentComplete={onDocumentComplete}   
                />     
                <p style={{textAlign: 'center'}}>
                    Page {page} of {pages}
                </p>
            </Modal>
        )
};
export default PdfViewer;