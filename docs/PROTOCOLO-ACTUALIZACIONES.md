# Protocolo permanente — actualizaciones de Nuevo Ragnarök

**Repositorio oficial:** https://github.com/carlos-lykos/ragnarok-actualizaciones  
**Ámbito:** actualizador de datos de PC y Android. El motor New Recruit y las instalaciones de producción quedan fuera de los cambios editoriales.

## Ciclo de una actualización

1. Recibir los documentos oficiales de Games Workshop y comprobar su publicación, fecha, alcance y versiones afectadas. Registrar las fuentes.
2. Comparar el contenido oficial con los datos activos. Actualizar costes, perfiles, unidades, armas, habilidades, estratagemas, keywords y reglas solo cuando el documento lo respalde. Mantener separadas la traducción y la fuente original.
3. Si una regla o diferencia no se interpreta con seguridad, detener esa parte y pedir aclaración. No inventar contenido ni certificar una cobertura que no se haya comprobado.
4. Aplicar los cambios mediante los actualizadores originales de preparación. No modificar New Recruit, MFM, Faction Packs, los validadores, Dropbox ni otros componentes ya validados salvo necesidad demostrada y autorización específica.
5. Generar los paquetes de PC y Android para la misma generación y secuencia ascendente. Mantener los datos de usuario fuera de los paquetes.
6. Ejecutar las comprobaciones de formato, firma, hashes, compatibilidad de plataforma, importación, restauración y reversibilidad disponibles. Informar por separado lo que pasó, lo pendiente y lo que no se pudo ejecutar.
7. No publicar material de terceros sin autorización suficiente de redistribución. Nunca subir claves privadas, contraseñas, tokens, Profile, listas personales ni diagnósticos con datos personales.
8. Publicar QA como prerelease y en un canal separado del estable. QA conserva TLS, firmas, hashes, límites y rollback; no se desactivan controles de seguridad.
9. Publicar estable solo tras validar ambas plataformas, contar con autorización de redistribución y verificar la descarga HTTPS anónima desde clientes. La automatización no debe convertir una validación técnica en aprobación editorial o legal.
10. No reemplazar ni borrar releases anteriores; no reutilizar una secuencia para contenido diferente. Ante cualquier error, detener publicación y conservar la generación actualmente activa.
11. Automatizar la creación de Releases mediante GitHub Actions/GITHUB_TOKEN de mínimo privilegio. Los paquetes se deben generar y firmar antes del job de publicación; el flujo nunca debe imprimir secretos. La publicación no debe requerir cargar manualmente los binarios a GitHub cada vez. Mantener QA y estable aislados, con estable detrás de protección y aprobación de entorno.
12. Entregar un informe con el resumen de cambios, fuentes, generación/secuencia, huellas, pruebas, publicación y limitaciones.

## Restricciones permanentes

- No tocar producción para ensayos.
- No modificar el motor New Recruit.
- No cambiar innecesariamente MFM, Faction Packs ni sistemas validados.
- No modificar el sincronizador de Dropbox.
- No eliminar versiones previas ni publicar paquetes incompletos.
- No afirmar pruebas, fuentes, permisos o certificaciones que no se hayan comprobado.
- No exponer claves privadas, credenciales ni datos personales.
- No redistribuir contenido de terceros sin autorización.
- Detener y comunicar cualquier cambio que no se pueda interpretar o validar correctamente.

## Estado de la prueba QA histórica (27/11/2026)

- El acceso de GitHub conectado identifica a `carlos-lykos`; el repositorio devuelve `admin/push`. La escritura está disponible.
- Existe una Release prerelease inocua `qa-canal-46037785195-1`; contiene solo una prueba firmada de transporte, no datos instalables.
- El replay histórico sustituye los 15 cambios ficticios por la generación certificada indicada en `RESULTADO-QA-REPLAY.md`. Los paquetes y APK QA se prepararon, pero no se declaran probados en dispositivos.
- Los clientes QA preparados apuntan a `https://qa.example.invalid/ragnarok/`. Esa URL está reservada y no sirve para clientes reales.
- La clave privada temporal que firmó ese replay se eliminó. No se debe publicar ni reutilizar esos paquetes como si fueran válidos para un canal nuevo. Para un QA real hay que reconstruir PC y Android con endpoint HTTPS accesible, una clave QA persistente protegida y su clave pública incorporada en ambos clientes.
- El repositorio es público. No subir el replay histórico hasta confirmar la autorización para redistribuir sus datos. El canal estable sigue separado y sin cambios.
- La prueba HTTPS actual verifica únicamente la descarga de un JSON inocuo. No demuestra la instalación o descarga de paquetes de PC/Android.
- La integración de Actions para paquetes requiere un origen seguro de artefactos y una ruta de compilación/firma disponible en runners; esos componentes no quedan configurados por el mero hecho de que el repositorio acepte escrituras.

## Evidencia de la primera revisión

Repositorio inspeccionado el 27/11/2026: `https://github.com/carlos-lykos/ragnarok-actualizaciones`. El permiso de escritura se verificó mediante los permisos devueltos por GitHub. La rama principal y los artefactos existentes no se alteraron durante la inspección.

