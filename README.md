# Proyecto ecommerce "El Bar de Moe"

Mi proyecto es un ecommerce de un Bar de barrio, basado en la serie televisiva "The Simpsons", que ofrece sus productos por internet listos para retirar o enviar.

Hasta el momento hay en catalogo 9 productos, divididos en 5 categorías, y en el cual se puede acceder a sus detalles presionando en el boton correspondiente, donde tambien se puede observar un itemcounter.
Una vez seleccionado el item a comprar, podremos dirigirnos al carrito para visualizar los items allí agregados antes de efectuar la compra.
El sitio cuenta con un sistema de cupones de uso individual. Por ahora hay agregados dos, siendo uno "Comision31855", que dará un descuento del 10%, y el otro "Portavasos" que agregará sin costo un portavasos al carrito.

## Iniciando el programa

Para acceder a los archivos por primera vez debe abrirse una carpeta nueva en el editor de código y abrir una terminal. Allí escribir "git clone https://github.com/Nikkun13/reactjs.git"
Luego posicionarse mediante la terminal en la carpeta que contenga los archivos .json y escribir "npm start". En este momento se abrirá una página de internet con el sitio cargado.

## Estructura del sitio

Empieza con un home, donde se visualiza el NavBar, común a todas las secciones del sitio, y las tarjetas de todos los productos disponibles para comprar. Seleccionando en cada una de las categorias presentes en el NavBar, es posible filtrar la cantidad inicial de productos de acuerdo a su tipo. Cada producto se visualiza en una tarjeta, en la cual se encuentra un boton para mostrar mas detalles. Presionarlo nos lleva a otra tarjeta más específica del producto seleccionado, teniendo la opcion de agregarlo al carrito en la cantidad que el stock disponible nos permita.
Finalmente estará la sección del carrito donde se visualizara la cantidad de productos que se quiera comprar, y un boton "pagar" que lleva a un formulario donde el usuario podrá cargar los datos personales y generar la orden de compra.

### Rutas

** /elBardeMoe **           => Corresponde al Home del sitio
** /category/:categoryId ** => Corresponde a cada una de las 5 categorías disponibles
** /item/:id **             => Corresponde a cada uno de los 9 items disponibles
** /cart **                 => Corresponde al carrito
** /formulario **           => Corresponde al formulario de detalles de la compra

### Componentes

** Cart **              => Renderiza una tabla que contiene todos los productos agregados al carrito, viendo el nombre, cantidad y precio (individual y grupal) de cada producto por separado, y luego de la compra total. Posee botones que permiten eliminar uno o todos los productos, seguir comprando o pagar. Además tambien tiene un cuadro de texto donde poder escribir códigos promocionales.

** CartWidget **        => Renderiza un contador de productos que solo aparece cuando es mayor que cero, acompañado de la imagen caracteristica de un carrito.

** Form **              => Renderiza el formulario de compra donde el usuario puede cargar sus datos y generar la orden. El formato de la orden generada será una array con 4 campos diferentes. El campo "Buyer" tendrá un objeto con los datos del comprador, el campo "Date" tendrá la fecha de compra, el campo "Items" será un array de objetos, donde estarán todos los productos comprados con sus respectivos datos y cantidad, y finalmente el campo "total" muestra el precio pagado por la compra.

** Item **              => Renderiza la tarjeta general de cada item. Muestra una imagen, un titulo, un precio, y un link que lleva al ItemDetail.

** ItemCount **         => Renderiza un contador con botones para sumar o restar productos, limitados por el stock disponible de cada producto. También cuenta con el botón que sirve para agregar la cantidad de producto seleccionado al carrito.

** ItemDetail **        => Renderiza la tarjeta detallada del producto seleccionado, además de lo ya mostrado en la tarjeta Item, ahora muestra una descripción, el ItemCount y el stock disponible.

** ItemDetailContainer ** => Contenedor del ItemDetail. Solo contiene un producto a la vez. Se renderiza la palabra "Cargando" cuando se cargan los productos.

** ItemList **          => Renderiza un listado de Items. Muestra varios Items a la vez.

** ItemListContainer ** => Contenedor del ItemList. Si recibe por parametro la categoria, se encarga de filtrar los items. Sino es lo que se muestra en la pagina Home.

** NavBar **            => Muestra la portada donde se encuentra la imagen de Moe, el cantinero. Se puede interactuar con el haciendo un click o dos click sobre su imagen. Tambien se muestra la marca, y el CartWiget cuando hay productos en el carrito. Ademas hay un boton de "Acceder" para loguearse en el sitio, aunque esa parte no está programada por lo que el boton no tiene efecto. Finalmente se encuentra el menú con categorias para poder filtrar los productos.

### Otras secciones

** Adapters **          => Aquí se encuentran archivos que adaptan los datos provenientes de firestore para si se modifica la forma en la que se carga la información en la base de datos, con solo modificar una linea en estos adaptadores el programa pueda funcionar correctamente sin tocar todos los demás archivos.

** Context **           => Aquí se crea el CartContext, donde se encuentran todas las funciones relacionadas al carrito. Se agregan productos, se suman a los ya existentes, cuida de no sobrepasar el stock, se eliminan, suma la cantidad total de items y la cantidad total a pagar, entre las funciones más importantes. Y al estar en context pueden relacionarse con todo el sitio facilmente.

** Hooks **             => Aquí se encuentra un mecanismo para responder a un error de renderizado cuando se ejecutan acciones antes de montar o despues de desmontar un componente.

** Notification **      => Aquí se encuentra el servicio de notificación del sitio. Cuando se realice una acción de manera satisfactoria se avisara con un mensaje en verde, cuando haya un error será rojo, y finalmente será amarillo cuando sea una advertencia.

** Services **          => Aquí se encuentra lo relacionado a firebase. En el archivo firestore.js se encuentra todo lo relacionado con las funciones que necesitan hacer uso de los datos cargados en firestore. En index se encuentra la inicializacion de firebase. Los datos estan enmascarados con variables de entorno (ubicadas en .env) para que no sean de conocimiento público

## Tecnologías utilizadas

Para el diseño del sitio se utilizó ** Bootstrap v5.1.1 **, además de css puro.
Entre las librerías de react utilizadas se encuentran: 
** React-Router-Dom ** para todo lo relacionado con Links que permiten navegar por el sitio y el armado de rutas. Tambien se encarga de mandar información por parámetros para el armado del ItemList.
** Context ** para relacionar el carrito y todas sus funciones a todo el sitio.
** Firebase / Firestore **, que actua como el BackEnd del proyecto, crear la base de datos de cada producto, poder controlar el stock, y finalmente ver la orden de compra creada.
