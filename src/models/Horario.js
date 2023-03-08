const mongoose = require("mongoose");

const horarioSchema = new mongoose.Schema({
	idUser: { type: String, required: true },
	"Segunda-feira": { type: Object, required: true },
	"Terça-feira": { type: Object, required: true },
	"Quarta-feira": { type: Object, required: true },
	"Quinta-feira": { type: Object, required: true },
	"Sexta-feira": { type: Object, required: true },
});

const horarios = mongoose.model("horarios", horarioSchema);

module.exports = horarios;
