import './App.css'
import {
  Button, CircularProgress, Dialog, Grid,
  Typography, DialogContent, DialogContentText, Backdrop,
  Box, TextField, DialogActions, DialogTitle, Checkbox, FormControlLabel,
} from "@mui/material";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import AhorcadoBox from "../components/ahorcadoImgBox.jsx"
import Keyboard from 'react-simple-keyboard';
import axios from "axios";

const DefBox = styled(Box)(({ theme }) => ({
  padding: "20px"
}));

const getRandomWord = async () => {
  try {
    const res = await axios.get("https://palabras-aleatorias-public-api.herokuapp.com/random")
    console.log(res)
    return res.data.body
  } catch (err) {
    console.log(err)
  }
}


export default function App() {

  const defKeysOfKeyboard = [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    'z x c v b n m']
  const [OpenDialog, setOpenDialog] = useState(false);
  const [OpenDialogMsg, setOpenDialogMsg] = useState(false);
  const [word, setWord] = useState("");
  const [RandomWord, setRandomWord] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [WordDef, setWordDef] = useState({});
  const [ManState, setManState] = useState(0);
  const [KeypressLetters, setKeypressLetters] = useState("");
  const [KeysOfKeyboard, setKeysOfKeyboard] = useState(defKeysOfKeyboard);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [GameStatus, setGameStatus] = useState("pause");


  const OnChangeInputText = ({ target }) => {
    //Si el input tiene uncaracter no permitido entonces no actualizamos
    if (!/^[a-zA-Z]*$/g.test(target.value)) {
      return;
    }
    setWord(target.value)
  }

  const SetDefValues = () => {
    setManState(0)
    setKeypressLetters("")
    setKeysOfKeyboard(defKeysOfKeyboard)
    setLetrasAdivinadas([])
  }

  const submitChanges = async () => {
    SetDefValues()
    if (RandomWord) {
      setLoading(true)
      const resgetRandomWord = await getRandomWord()
      setWordDef(resgetRandomWord)
      setWord(resgetRandomWord.Word)
      localStorage.setItem("word", resgetRandomWord.Word)
      setLetrasAdivinadas(Array(resgetRandomWord.Word.length).fill(''))
      setLoading(false)

    } else {
      localStorage.setItem("word", word)
      setWordDef({})
      setLetrasAdivinadas(Array(word.length).fill(''))

    }
    setOpenDialog(false)
    setGameStatus("playing")

  }
  const onKeyPress = (a) => {
    if (GameStatus === "pause") {
      setOpenDialog(true)
      return
    }
    if(a==="")return
    console.log(a)
    setKeypressLetters(a)
    setKeysOfKeyboard(JSON.parse(JSON.stringify(KeysOfKeyboard).replace(a, '')))
    if (!word.split("").some((w) => w === a)) {
      setManState(ManState + 1)
      if (ManState + 1 > 5) {
        setOpenDialogMsg({
          title: "Perdiste :c",
          content: `Intentalo otra vez, la palabra era: ${word}`,
          innerHtml: WordDef?.DefinitionMD
        })
        setGameStatus("pause")
      }
      return
    }
    const updateLetrasAd = word.split("").map((w, i) => w === a ? w : letrasAdivinadas[i])
    setLetrasAdivinadas(updateLetrasAd)

    if (!updateLetrasAd.some((w) => w === "")) {
      setOpenDialogMsg({
        title: "Ganaste :)",
        content: `Sigue así, la palabra era: ${word}`,
        innerHtml: WordDef?.DefinitionMD
      })
      setGameStatus("pause")
      return
    }


  }



  return (
    <>
      <Backdrop
        open={Loading}
        sx={{ zIndex: (theme) => 100 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <main>
        <Dialog open={Boolean(OpenDialogMsg)} sx={{ zIndex: 10 }}>

          <DialogTitle>{OpenDialogMsg.title}</DialogTitle>
          <DialogContent>
            {OpenDialogMsg.content}
            <br />
            <strong dangerouslySetInnerHTML={{ __html: OpenDialogMsg?.innerHtml }}></strong>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialogMsg(false)}
              variant="contained">aceptar</Button>
          </DialogActions>

        </Dialog>
        <Dialog open={OpenDialog} onClose={() => setOpenDialog(false)} sx={{ zIndex: 10 }}>

          <DialogTitle>Palabra para jugar</DialogTitle>
          <DialogContent>

            <FormControlLabel
              control={
                <Checkbox
                  checked={RandomWord}
                  onChange={() => setRandomWord(!RandomWord)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Usar palabra aleatoria"
            />
            {
              RandomWord ? "" :
                <TextField
                  onChange={OnChangeInputText}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Palabra para jugar"
                  type="name"
                  fullWidth
                  variant="standard"
                  value={word}
                />
            }
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={submitChanges}
              disabled={word.replace(/\s/g, '') === "" && !RandomWord}>aceptar</Button>
          </DialogActions>

        </Dialog>
        <Typography variant={"h3"}>
          <strong>
            Juego del ahorcado
          </strong>
        </Typography>
        <br />
        <Button variant="outlined" onClick={() => setOpenDialog(true)}>
          Seleccionar palabras para jugar</Button>

        {/*juego*/}
        <br />
        <Box sx={{ display: "flex", alignSelf: "center", alignItems: "center" }} id="GameDiv" >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }} >
            <Box sx={{ display: "flex", alignItems: "end" }} >
              {
                letrasAdivinadas.map((d, ind) => (

                  <Box
                    key={ind}
                    sx={{
                      width: "25px",
                      mr: "3px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }} >
                    <Typography variant={"h5"}>
                      <strong>
                        {d}
                      </strong>
                    </Typography>
                    <Box sx={{ width: "20px", height: "4px", background: "#3454d1", }} />
                  </Box>
                ))
              }
            </Box>
            <br />
            <Keyboard
              onKeyPress={onKeyPress}
              layout={{ default: KeysOfKeyboard }}
              theme={"hg-theme-default myTheme1"}
            />
          </Box>
          <AhorcadoBox status={ManState}
            style={{
              width: "clamp(50px, 45vw, 350px)",
              margin: "10px",
              filter: "invert(1)"
            }} />
        </Box>
      </main>
      <footer >
        Grupo 2:
        <ul>
          <li>Gerson Rodriguez</li>
          <li>Cesar Acjota</li>
        </ul>
      </footer>
    </>
  )
}