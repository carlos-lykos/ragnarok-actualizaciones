# Publicación de datos — Nuevo Ragnarök

Este procedimiento corresponde a PC V1.05 R3 y Android V1.05 DEV3. El repositorio suministra datos al actualizador único. No contiene el motor, listas de usuario ni credenciales. Dropbox conserva su función exclusiva de sincronización de listas.

## Ciclo editorial (cada nueva actualización oficial)

1. Preparar una copia de PC sin listas personales. Arrancar mediante `Herramientas/Inicio-Modo-Preparacion.cmd` para usar los actualizadores originales. Obtener MFM, Faction Packs, reglas, FAQ y erratas aplicables de sus fuentes oficiales.
2. Si existe un bloqueo, enviar al chat de contingencia los documentos nuevos y el diagnóstico actual de la instalación de preparación. No inventar cambios, identificadores ni traducciones. Importar el JSON revisado mediante el actualizador original de preparación; comprobar cobertura completa y pruebas nativas. No firmar cambios incompletos.
3. Cerrar Ragnarök. Usar el kit **Ragnarok-Publicador-y-Contrato-Canal.zip**, con `Preparar-publicacion.cmd`. Seleccionar la instalación validada y una secuencia ascendente (primera: 1). Introducir la contraseña de la clave cifrada exclusivamente en el equipo local. El publicador genera los tres archivos en una carpeta nueva.
4. Probar la importación y restauración conjunta en PC R3 y Android DEV3. Conservar las evidencias de pruebas y revisión. Verificar que no se alteran listas, código del motor ni traducciones independientes.
5. Si se dispone de autorización suficiente para redistribuir todo el contenido, crear un borrador de release en GitHub con tag `datos-000001` (ajustar a la secuencia). Adjuntar juntos y con nombres exactos:
   - `ragnarok-channel.json`
   - `ragnarok-pc.rkupdate`
   - `ragnarok-android.rkupdate`
6. Verificar los archivos descargados del borrador con el comprobador incluido. El repositorio y el verificador se pueden descargar con Git: `git clone https://github.com/carlos-lykos/ragnarok-actualizaciones.git`. Dentro de la copia, con Node.js instalado, ejecutar:
   ```sh
   node tools/verificar-publicacion.cjs "CARPETA_DE_LOS_TRES_ARCHIVOS"
   ```
   Debe finalizar con código 0. Verifica firma RSA-3072, hashes, tamaños, correspondencia del manifiesto y plataformas; **no sustituye** las validaciones semánticas ni nativas.
7. Publicar como release normal (no borrador, no prerelease), marcada como última release. Comprobar la descarga en PC y Android físicos, sin cuenta de GitHub. Si la publicación falla, no improvisar: conservar las selecciones activas, investigar y preparar una nueva secuencia si procede.

## Contrato de distribución

Los clientes consultan:
`https://github.com/carlos-lykos/ragnarok-actualizaciones/releases/latest/download/`

La secuencia es un entero ascendente. No reutilizar una secuencia para contenido diferente ni sustituir los archivos de una publicación ya publicada. Las dos plataformas corresponden a la misma generación validada. La clave pública incorporada en ambas aplicaciones debe coincidir con `keys/public.pem`.

La prueba `qa-canal-*` es una prerelease, no instalable y excluida de la última release estable. No moverla al canal estable: su formato de prueba es deliberadamente distinto del contrato de producción. Hasta que exista una publicación real autorizada, no hay novedades instalables en el canal.

## Seguridad y privacidad

- No subir la clave privada, su contraseña, tokens ni carpetas Profile. Guardar clave privada cifrada y contraseña por separado.
- La clave pública es verificable y puede distribuirse.
- No subir datos personales ni contenidos de terceros sin autorización suficiente de redistribución.
- El formato no admite código ejecutable. Los clientes deben rechazar paquetes no verificados o incompatibles y conservar la versión activa ante errores.
- Si una actualización futura requiere cambios estructurales del motor o del formato, se necesita una nueva versión de la aplicación. No se puede resolver mediante la firma de datos incorrectos.
