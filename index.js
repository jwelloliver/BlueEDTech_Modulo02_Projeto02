require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const pokedex = [
  {
      id: 1,
      numero: "001",
      nome: "Bulbasaur",
      descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
      tipo: "Grass",
      altura: "0.7 m",
      peso: "6.9 kg",
      categoria: "Seed",
      habilidade: "Overgrow",
      imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
  },
  {
      id: 2,
      numero: "002",
      nome: "Ivysaur",
      descricao: "Quando o bulbo nas costas cresce, parece perder a capacidade de ficar em pé nas patas traseiras.",
      tipo: "Grass",
      altura: "1.0 m",
      peso: "13.0 kg",
      categoria: "Seed",
      habilidade: "Overgrow",
      imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png"
  },
  {
      id: 3,
      numero: "003",
      nome: "Venusaur",
      descricao: "Sua planta floresce quando está absorvendo energia solar. Ele permanece em movimento para buscar a luz do sol.",
      tipo: "Grass",
      altura: "2.0 m",
      peso: "100.0 kg",
      categoria: "Seed",
      habilidade: "Overgrow",
      imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
  }
];

let pokemon = undefined;

app.get("/", (req, res) => {
  res.render("index",  {pokedex, pokemon});
});

app.get("/index", (req, res) => {
  res.render("index",  {pokedex, pokemon});
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro", {pokedex, pokemon});
});

app.get("/detalhes", (req, res) => {
  res.render("detalhes", {pokedex, pokemon});
});

app.post("/add", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length +1;
  pokedex.push(pokemon);
  res.redirect("/detalhes");
});

app.get("/editar/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find(item => item.id === id);

  res.redirect("/cadastro");
});

app.post("/update/:id", (req,res) => {
  const id = +req.params.id - 1;

  const newPokemon = req.body;
  newPokemon.id = id + 1
  console.log(newPokemon)
  pokedex[id] = newPokemon;
  
  pokemon = undefined;

  
  res.redirect("/detalhes");
});

app.get("/deletar/:id", (req,res) => {
  const id = +req.params.id;

  pokedex.splice(id, 1);

  console.log(pokedex)

  res.redirect("/detalhes")
  
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));