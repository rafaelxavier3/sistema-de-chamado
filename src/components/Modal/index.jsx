import './modal.scss'
import { CiCircleRemove } from "react-icons/ci";

export function Modal({conteudo, close}){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <CiCircleRemove fontSize={25} color='white'/>
          Fechar
        </button>
        <main>
          <h2>Detalhes do chamado</h2>
          <div className='row'>
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className='row'>
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
            <span>
              Cadatrado em: <i>{conteudo.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
             Status: 
             <i className='status-badge' style={{ color: "#FFF", backgroundColor: conteudo.status === 'Aberto' ? 'green' : 'gray'}}>
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.complemento !== '' && (
          <>
            <h3>Anotações</h3>
            <p>
            {conteudo.complemento}
            </p>
          </>
          )}
        </main>
      </div>
    </div>
  )
}