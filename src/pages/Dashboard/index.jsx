import { AuthContext } from '../../contextsAuth'
import { useContext, useEffect, useState } from 'react'

import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { Title } from '../../components/Title'
import { CiEdit, CiSearch, CiChat1, CiSquarePlus } from "react-icons/ci";

import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../services/FirebaseConnection';

import { format } from 'date-fns'

import './dashboard.scss'

const listRef = collection(db, "chamados")

export function Dashboard() {
  const { logout } = useContext(AuthContext)

  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [detail, setDetail] = useState()

  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnapshot = await getDocs(q)
      await updateState(querySnapshot)

      setLoading(false)
    }

    loadChamados()

    return () => { }
  }, [])

  async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          complemento: doc.data().complemento,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd//MM/yyyy'),
          status: doc.data().status,
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] //pegando o ultimo item da lista
      setChamados(chamados => [...chamados, ...lista])
      setLastDocs(lastDoc)
    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false)
  }

  async function handleMore(){
    setLoadingMore(true)
    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5))
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
    setLoading(false)
  }

  function toggleModal(item){
    setShowPostModal(!showPostModal)
    setDetail(item)
  }

  if(loading){
    return(
      <div>
        <Header/>
        <div className="content">
          <Title name="Tickets">
            <CiChat1 size={25} />
          </Title>
          <div className='container dashboard'>
            <span>Buscando chamados...</span>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <CiChat1 size={25} />
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className='container dashboard'>
              <span>Nenhum chamado encontrado</span>
              <Link to="/new" className='new'>
                <CiSquarePlus size={25} color='#FFF' />
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className='new'>
                <CiSquarePlus size={25} color='#FFF' />
                Novo chamado
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Assunto</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Cadastrado em</th>
                    <th scope='col'>#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) =>{
                    return(
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? 'green' : 'gray' }}>{item.status}</span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button onClick={() => toggleModal(item)} className='action' style={{ backgroundColor: '#0817EA' }}>
                            <CiSearch color='#FFF' size={17} />
                          </button>
                          <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: 'orange' }}>
                            <CiEdit color='#FFF' size={17} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {loadingMore && <h3>Buscando chamados...</h3>}
              {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais chamados</button>}
            </>
          )}       
        </>
      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </div>
  )
}