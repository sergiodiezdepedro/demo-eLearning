# Demo de Curso de e-Learning

Para realizar esta demo he utilizado como framework [Foundation](http://foundation.zurb.com/), que ofrece herramientas más robustas y sofisticadas que otras propuestas análogas.

Para reproducir todo lo necesario para que el proyecto genere todos los contenidos para producción son necesarios unos simples pasos:

1. Tener instalados globalmente **bower** y **node**.

2. Instalar globalmente con npm **foundation-cli**.

3. Instalar las dependencias de bower y node como es habitual.

4. Una vez todo instalado, en la raíz del proyecto ejecutar en terminal `foundation watch`. Este comando genera la carpeta *dist*, compila Sass, JS, templates de [handlebars](http://handlebarsjs.com/), lanza un servidor, etc, etc.

5. Una vez terminado el desarrollo del proyecto, para obtener la versión definitiva para producción hay que ejecutar el comando `npm run build`.

Para más cuestiones sobre el *boilerplate* de Foundation, me remito a la [documentación](http://foundation.zurb.com/sites/docs/) correspondiente.
