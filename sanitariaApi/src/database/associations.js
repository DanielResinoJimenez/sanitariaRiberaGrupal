const User = require("./models/User");
const Cassette = require("./models/Cassette");
const Muestra = require("./models/Muestra");
const Imagen = require("./models/Imagen");

// Relación User Crea Cassete 1:N

User.hasMany(Cassette);
Cassette.belongsTo(User);

// Relación Cassette tiene Muestra 1:N

Cassette.hasMany(Muestra);
Muestra.belongsTo(Cassette);

// Relación Muestra tiene Imagen 1:N

Muestra.hasMany(Imagen);
Imagen.belongsTo(Muestra);