import supertest from 'supertest';
import app from '../src/app'; // Importa o app configurado

const request = supertest(app); // Cria uma instância do cliente para testar a API

describe('Testando Endpoints da API', () => {
    it('GET /api/users deve retornar status 200', async () => {
        const response = await request.get('/api/users'); // Testa o endpoint GET
        expect(response.status).toBe(200); // Verifica se o status HTTP é 200
    });


    it('GET /api/users/login deve retornar status 200', async () => {
        const response = await request.post('/api/users/login').send({
            email: 'teste@teste',
            password: '123'
        });
        expect(response.status).toBe(200);
    });

    
});
