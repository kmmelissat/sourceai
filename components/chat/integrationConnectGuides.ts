export type ConnectGuide = {
  headline: string;
  steps: string[];
};

const DEFAULT_STEPS = [
  "Inicia sesión con una cuenta que tenga acceso al espacio de trabajo.",
  "Autoriza a SourceAI con los permisos de solo lectura que necesites.",
  "Elige qué espacios, proyectos o recursos incluir en el contexto del chat.",
  "Guarda y comprueba el estado de la conexión antes de volver al chat.",
];

const guides: Record<string, ConnectGuide> = {
  notion: {
    headline: "Cómo conectar Notion",
    steps: [
      "Abre la conexión y elige el workspace de Notion que quieres vincular.",
      "Permite el acceso a las páginas y bases de datos que SourceAI podrá consultar.",
      "Selecciona colecciones o páginas raíz (por ejemplo producto, ingeniería o wiki).",
      "Confirma la sincronización y revisa que el chat pueda citar tus docs.",
    ],
  },
  confluence: {
    headline: "Cómo conectar Confluence",
    steps: [
      "Inicia sesión con tu cuenta Atlassian y elige el sitio de Confluence.",
      "Autoriza el acceso de lectura a los espacios que quieras indexar.",
      "Indica qué espacios o árboles de páginas entran en el contexto.",
      "Valida la conexión desde el panel y prueba una pregunta sobre specs internas.",
    ],
  },
  coda: {
    headline: "Cómo conectar Coda",
    steps: [
      "Conecta tu cuenta de Coda y elige el doc o pack que centraliza tu conocimiento.",
      "Define qué tablas, vistas o secciones pueden leerse desde SourceAI.",
      "Si usas Packs, asegúrate de que las credenciales compartidas estén activas.",
      "Termina el flujo y verifica que los resúmenes en chat reflejen tus docs.",
    ],
  },
  slab: {
    headline: "Cómo conectar Slab",
    steps: [
      "Autentícate con el equipo de Slab que aloja tu base de conocimiento.",
      "Selecciona los temas o colecciones de documentación técnica a incluir.",
      "Ajusta el alcance si solo quieres parte del contenido público o interno.",
      "Completa la vinculación y prueba búsquedas sobre runbooks o decisiones.",
    ],
  },
  github: {
    headline: "Cómo conectar GitHub",
    steps: [
      "Inicia el flujo OAuth con la organización o usuario correcto de GitHub.",
      "Concede permisos de lectura sobre repos y, si aplica, pull requests.",
      "Elige repos concretos o patrones (por equipo o etiqueta) para el índice.",
      "Opcional: añade también repos por URL desde la sección inferior de esta página.",
    ],
  },
  gitlab: {
    headline: "Cómo conectar GitLab",
    steps: [
      "Entra con GitLab.com o la URL de tu instancia self-hosted.",
      "Crea o usa un token con alcance de lectura de proyectos y merge requests.",
      "Marca los grupos o proyectos que deben alimentar el contexto del chat.",
      "Guarda y revisa que los archivos y MR recientes queden disponibles.",
    ],
  },
  bitbucket: {
    headline: "Cómo conectar Bitbucket",
    steps: [
      "Autoriza SourceAI con tu cuenta Atlassian Bitbucket.",
      "Selecciona el workspace y los repos de código a indexar.",
      "Si usas Bitbucket Server/Data Center, indica la URL base y credenciales de app.",
      "Finaliza y comprueba acceso a ramas y pull requests relevantes.",
    ],
  },
  linear: {
    headline: "Cómo conectar Linear",
    steps: [
      "Conecta tu workspace de Linear con una cuenta de administrador o miembro.",
      "Otorga lectura de issues, proyectos y ciclos que quieras consultar en el chat.",
      "Filtra por equipos o etiquetas si no quieres exponer todo el backlog.",
      "Confirma la integración y pregunta por estado de iniciativas o bugs.",
    ],
  },
  jira: {
    headline: "Cómo conectar Jira",
    steps: [
      "Vincula tu sitio Jira Cloud (o Server con URL y app link).",
      "Autoriza lectura de proyectos, issues y tableros seleccionados.",
      "Define JQL o proyectos límite para reducir ruido en las respuestas.",
      "Prueba una consulta sobre sprints, épicas o tickets abiertos.",
    ],
  },
  clickup: {
    headline: "Cómo conectar ClickUp",
    steps: [
      "Inicia sesión en ClickUp y elige el workspace del equipo.",
      "Permite acceso de lectura a listas, carpetas y espacios indicados.",
      "Opcional: restringe a vistas concretas (p. ej. solo ingeniería o producto).",
      "Verifica que tareas y comentarios aparezcan en el contexto del asistente.",
    ],
  },
  asana: {
    headline: "Cómo conectar Asana",
    steps: [
      "Conecta tu organización de Asana y el perfil con permisos adecuados.",
      "Selecciona proyectos o portfolios que quieras incluir.",
      "Marca si deben leerse solo tareas completadas o también activas.",
      "Cierra el asistente de conexión y valida con una pregunta sobre hitos.",
    ],
  },
  slack: {
    headline: "Cómo conectar Slack",
    steps: [
      "Elige el workspace de Slack e instala la app de SourceAI en ese workspace.",
      "Autoriza canales públicos y, si procede, privados que quieras indexar.",
      "Configura exclusiones (p. ej. #random) para cumplir privacidad.",
      "Comprueba que hilos y decisiones recientes estén disponibles para el chat.",
    ],
  },
  microsoftteams: {
    headline: "Cómo conectar Microsoft Teams",
    steps: [
      "Inicia sesión con Microsoft 365 y el consentimiento del administrador si hace falta.",
      "Selecciona el equipo o los canales cuyo historial puede consultarse.",
      "Respeta políticas de retención y cumplimiento de tu organización.",
      "Finaliza y prueba una pregunta sobre acuerdos o anuncios del equipo.",
    ],
  },
  discord: {
    headline: "Cómo conectar Discord",
    steps: [
      "Añade el bot de SourceAI al servidor con permisos de lectura en canales elegidos.",
      "Indica qué categorías o canales de texto forman parte del contexto.",
      "Evita exponer canales sensibles; revisa roles y permisos del bot.",
      "Guarda y valida desde el chat con una pregunta sobre mensajes recientes.",
    ],
  },
  metabase: {
    headline: "Cómo conectar Metabase",
    steps: [
      "Indica la URL de tu instancia Metabase (cloud o self-hosted).",
      "Usa una cuenta de servicio o API key con acceso de solo lectura a colecciones.",
      "Selecciona dashboards o preguntas guardadas que el asistente pueda resumir.",
      "Comprueba la conexión y evita exponer datos personales sin anonimizar.",
    ],
  },
  tableau: {
    headline: "Cómo conectar Tableau",
    steps: [
      "Conecta Tableau Cloud o Server con un usuario de solo lectura.",
      "Autoriza workbooks o proyectos que quieras usar como contexto.",
      "Sincroniza metadatos de campos y descripciones para mejores respuestas.",
      "Verifica permisos de fila y seguridad a nivel de datos en tu entorno.",
    ],
  },
  looker: {
    headline: "Cómo conectar Looker",
    steps: [
      "Vincula tu instancia Looker (Looker Studio o Looker original según tu stack).",
      "Proporciona credenciales OAuth o client ID con alcance de lectura.",
      "Elige modelos, explores o informes que pueden consultarse desde SourceAI.",
      "Revisa gobernanza de datos antes de activar la conexión.",
    ],
  },
  vercel: {
    headline: "Cómo conectar Vercel",
    steps: [
      "Inicia sesión con la cuenta de Vercel del equipo o la personal vinculada.",
      "Autoriza lectura de proyectos, despliegues y variables no sensibles si aplica.",
      "Selecciona los proyectos cuyo historial de deploy quieres en el contexto.",
      "Confirma y usa el chat para preguntar por previews o errores de build.",
    ],
  },
  docker: {
    headline: "Cómo conectar Docker",
    steps: [
      "Conecta tu organización en Docker Hub o el registro privado compatible.",
      "Usa un token de solo lectura para imágenes y tags relevantes.",
      "Indica repos de imagen que documentan tu stack en runtime.",
      "Valida que el asistente pueda referenciar versiones y Dockerfiles publicados.",
    ],
  },
  kubernetes: {
    headline: "Cómo conectar Kubernetes",
    steps: [
      "Proporciona el endpoint del clúster y un kubeconfig o token con rol limitado.",
      "Restringe namespaces y recursos (Deployments, Services) visibles para SourceAI.",
      "No otorgues permisos de escritura salvo que el flujo lo requiera explícitamente.",
      "Prueba con consultas sobre despliegues y salud del clúster en modo lectura.",
    ],
  },
  aws: {
    headline: "Cómo conectar AWS",
    steps: [
      "Crea un rol IAM de solo lectura o usa AWS Organizations según tu política.",
      "Indica la cuenta y región; limita servicios (p. ej. S3, Lambda, ECS) expuestos.",
      "Evita claves de larga duración en texto plano; prefiere OIDC o roles temporales.",
      "Audita CloudTrail tras la primera conexión para registrar el acceso.",
    ],
  },
  auth0: {
    headline: "Cómo conectar Auth0",
    steps: [
      "Registra una Machine-to-Machine o SPA según el flujo de SourceAI en tu tenant.",
      "Configura scopes de Management API solo para lectura de usuarios y apps.",
      "Restringe por entorno (dev/staging/prod) para no mezclar identidades.",
      "Rota secretos periódicamente y revisa logs de acceso en Auth0.",
    ],
  },
  clerk: {
    headline: "Cómo conectar Clerk",
    steps: [
      "Abre el dashboard de Clerk y genera una API key restringida al entorno correcto.",
      "Vincula la instancia de desarrollo o producción que quieres documentar en el chat.",
      "Marca qué organizaciones o aplicaciones son visibles para el asistente.",
      "Completa el flujo y valida que no se expongan datos de usuario innecesarios.",
    ],
  },
  hubspot: {
    headline: "Cómo conectar HubSpot",
    steps: [
      "Conecta con OAuth usando un usuario con acceso al portal CRM.",
      "Limita objetos (contactos, deals, tickets) y pipelines incluidos en el índice.",
      "Respeta GDPR y bases legales antes de indexar datos personales.",
      "Prueba el chat con preguntas sobre embudos o acuerdos recientes.",
    ],
  },
  salesforce: {
    headline: "Cómo conectar Salesforce",
    steps: [
      "Usa Connected App y flujo OAuth con permisos mínimos de lectura.",
      "Selecciona objetos y campos permitidos (Cuentas, Oportunidades, Casos, etc.).",
      "Configura sandboxes aparte de producción si quieres probar primero.",
      "Revisa políticas de Field-Level Security y sharing rules en tu org.",
    ],
  },
};

export function getConnectGuide(appId: string, appName: string): ConnectGuide {
  const g = guides[appId];
  if (g) return g;
  return {
    headline: `Conectar ${appName}`,
    steps: DEFAULT_STEPS,
  };
}
