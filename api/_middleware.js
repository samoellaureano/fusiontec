export function middleware(req) {
    const basicAuth = req.headers.get('authorization');

    // Mapa com usuários e senhas válidos
    const users = new Map([
        ['Samoell', 'S@2025'],
        ['Matheus', 'devpass456'],
    ]);

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pass] = atob(authValue).split(':');

        // Validação usando o Map
        if (users.has(user) && users.get(user) === pass) {
            return; // autorizado
        }
    }

    return new Response('Autenticação requerida', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}
