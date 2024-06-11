const CBMRepository = require("../services/CBMRepository");

exports.listAllOccurrences = async (req, res) => {
  try {
    const occurence = await CBMRepository.listAllOccurrences();
    res.status(200).json(occurence);
  } catch (err) {
    res.status(500).json({ error: err.toString() }, "ERRO DO SERVER");
  }
};

exports.createOccurrence = async (req, res) => {
  try {
    const occurence = await CBMRepository.createOccurrence(req.body);
    res.status(201).json(occurence);
  } catch (error) {
    res.status(500).json({ error: err.toString() }, "ERRO DO SERVER");
  }
};

exports.updateOccurrence = async (req, res) => {
  try {
    const occurence = await CBMRepository.updateOccurrence(
      req.params.id,
      req.body
    );
    if (!occurence) {
      res.status(404).json({ error: "User não encontrado" });
    } else {
      res.status(200).json(occurence);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

exports.deleteOccurrence = async (req, res) => {
  try {
    const occurence = await CBMRepository.deleteOccurrence(req.params.id);
    console.log(occurence);

    if (occurence === null) {
      res.status(404).json({ error: "Ocorrência não encontrada" });
    } else {
      res.status(200).json({ msg: "Ocorrência deletado com sucesso" });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

exports.getOccurrenceById = async (req, res) => {
  try {
    const occurence = await CBMRepository.getOccurrenceById(req.params.id);
    if (!occurence) {
      res.status(404).json({ error: "Ocorrencia não encontrada" });
    } else {
      res.status(200).json(occurence);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};
