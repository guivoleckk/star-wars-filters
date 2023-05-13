const profileData = [{
  fullName: 'Guilherme Pessoa Voleck Costa',
  techs: 'React, NodeJS',
}];
const welcome = 'Olá! seja bem vindo ao perfil do';
console.log(profileData
  .map((profile) => `${welcome} ${profile.fullName}`)
  .find((profile) => profile));
