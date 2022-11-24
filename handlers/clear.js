const fs = require("fs");
const path = require("path");
const gravacoesPath = path.join(__dirname, "..", "gravacoes");

const clearGravacoes = () => {
	fs.readdir(gravacoesPath, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			fs.unlink(path.join(gravacoesPath, file), (err) => {
				if (err) throw err;
			});
		}
	});
};

module.exports = clearGravacoes;
