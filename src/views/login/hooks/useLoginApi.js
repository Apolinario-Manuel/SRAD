import { useCallback, useState, useContext } from 'react';
import api from "../../../services/api";
import { AppContext } from './context';
import swal from 'sweetalert';


export default function useLoginApi() {
 
  const  { data: dataContext } = useContext(AppContext);
  const [carregando, setCarregando] = useState();
 
  //localStorage.clear();

  const logar = useCallback(async (email, password) => {

    setCarregando(true);

    try {
      let da = new FormData();

      da.append("email", email);
      da.append("senha", password);
      
      const retorno = await api.post('/login', da);

      if(retorno.status === 200 && retorno.data.type !="error") {

          dataContext.setState({
            usuario: retorno.data.data
          });
      }
      else{
        swal({
          title: "Dados Incorrectos!",
          text: (retorno?.data?.message) ? retorno.data.message :"Verifique os seus dados",
          icon: "error",
          button: "OK!",
        })
      }

      /*if(email.includes("provincial")){
        dataContext.setState({
          usuario: {
            type: "provincial",
          }
        });
      }
      else if(email.includes("municipal")){
        dataContext.setState({
          usuario: {
            type: "municipal"
          }
        });
      }
      else if(email.includes("admin")){
        dataContext.setState({
          usuario: {
            type: "admin"
          }
        });
      }*/
          

        {/*const retorno = await api.post('/verificar', da);
        console.log(retorno)
        if(retorno.status === 200 && retorno.data.type !="error") { 

          retorno.data={
            ...retorno.data,
          };

          dataContext.setState({
            usuario: retorno.data
          }); 
        }
        else{
          swal({
            title: "Dados Incorrectos!",
            text: (retorno?.data?.message) ? retorno.data.message :"Verifique os seus dados",
            icon: "error",
            button: "OK!",
          })}
        */}
      
      

    } catch (err) {
      swal({
        title: "Não é possível entrar!",
        text: "Verifique a sua conexão ou contacte o Admin",
        icon: "error",
        button: "OK!",
      })
      console.log('erro', err);
    } finally {
      setCarregando(false);
    }

  }, [dataContext]);

  return [logar, carregando];
}




