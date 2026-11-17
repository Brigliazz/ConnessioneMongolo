import mongoose from 'mongoose';

const animaleSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  specie: { type: String, required: true },
  eta: { type: Number, required: true },
  vaccinato: { type: Boolean, default: false },
  dataRegistrazione: { type: Date, default: Date.now }
}, {
  collection: 'animali'
});

animaleSchema.methods.descrizione = function () {
  return `${this.nome} (${this.specie}), ${this.eta} anni - Vaccinato: ${this.vaccinato ? 'Sì' : 'No'}`;
};

export const Animale = mongoose.model('Animale', animaleSchema);