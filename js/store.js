const cart = [];

const sectionCards = [
  {
    id: 'ollivanders',
    nombre: 'Ollivanders',
    descripcion: 'Todo mago necesita una varita mágica. Visita la tienda de Ollivander´s y consigue la tuya.',
    img: `../media/ollivanders-t.png`,

  },
  {
    id: 'quidditch-supplies',
    nombre: 'Quality Quidditch Supplies',
    descripcion: 'Ya sea que juegues al Quidditch o la uses para hacer las compras, en Articulos de Calidad para Quidditch tenemos la escoba que se adapta a tus necesidades ',
    img: `../media/qqs.png`,
  },
  {
    id: 'flourish-blotts',
    nombre: 'Flourish and Blotts ',
    descripcion: 'Encuentra todos los libros que necesitas para iniciar tu nuevo año escolar.',
    img: `../media/flourish.png`,
  },
];

// DOM MANIPULATION
{/* <div class='ollivander-cards col-7'></div> */}

$('#varitas').append(`
<div class='ollivanders-section col-5'></div>
`)

$('.ollivanders-cards').append()



