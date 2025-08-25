Este proyecto es el frontend de una aplicación web para la gestión de registros de marca. Fue desarrollado como parte de una prueba técnica para el rol de desarrollador Full Stack.

El frontend permite a los usuarios:

* Ver una lista de registros existentes.
* Crear nuevos registros a través de un formulario de múltiples pasos.

## Tecnologías Utilizadas

Frontend:
    *Next.js (https://nextjs.org/)
    * React(https://reactjs.org/)
    * TypeScript
    * Bootstrap* 
    

Estado:
    * Se utiliza React Context API para la gestión del estado del formulario de múltiples pasos.

Para ejecutar este proyecto de forma local, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone (https://github.com/carlosb114093/marcas-frontend)
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd nombre-del-repo-frontend
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    # o yarn
    # yarn install
    ```
4.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    # o yarn
    # yarn dev
    ```

Servidor Backend
El frontend consume una API REST.estará disponible en `http://localhost:3000`. 

Repositorio Backend
https://github.com/carlosb114093/marcas-backend
