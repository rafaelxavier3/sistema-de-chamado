import { useContext, useState } from 'react';
import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import avatarImg from "../../assets/avatar.png"

import { CiSettings } from "react-icons/ci";

import { AuthContext } from '../../contextsAuth';

import { db, storage } from "../../services/FirebaseConnection"
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import './profile.scss'
import { toast } from 'react-toastify';

export function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)
  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG")
        setImageAvatar(null)
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (downloadURL) => {
          let urlFoto = downloadURL;

          const docRef = doc(db, "users", user.uid)
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome: nome,
          })
            .then(() => {
              let data = {
                ...user,
                nome: nome,
                avatarUrl: urlFoto,
              }

              setUser(data);
              storageUser(data);
              toast.success("Atualizado!")
            })
        })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && nome !== '') {
      //atualizar apenas o nome do user
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        nome: nome,
      })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          }

          setUser(data);
          storageUser(data);
          toast.success("Atualizado!")
        })
    } else if (nome !== '' && imageAvatar !== null) {
      //atualizar nome e foto
      handleUpload();
    }
  }

  return (
    <div>
      <Header />

      <div className='content'>
        <Title name="Meu perfil">
          <CiSettings size={25} />
        </Title>

        <div className="container">
          <form className='form-profile' onSubmit={handleSubmit}>
            <label className="label-avatar">
              {avatarUrl === null ? (
                <img src={avatarImg} alt='Foto de perfil' width={150} height={150} />
              ) : (
                <img src={avatarUrl} width={150} height={150} />
              )}
              <input type="file" accept='image/*' onChange={handleFile} /> <br />
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type='submit'>Salvar</button>
          </form>
        </div>
        <div className="container">
          <button className='logout-btn' onClick={() => logout()}>Sair</button>
        </div>
      </div>

    </div>
  )
}