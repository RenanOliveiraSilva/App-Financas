import supertest from 'supertest';
import app from '../src/app';  
import jwt from 'jsonwebtoken';

const request = supertest(app);

const SECRET_KEY = process.env.JWT_SECRET || 'minha-chave-secreta';
const testToken = jwt.sign({ id: 2, email: 'renan@teste' }, SECRET_KEY, { expiresIn: '1h' });

describe('Testando rotas protegidas de despesas com Token JWT', () => {

    // ✅ Testando despesa única
    it('POST /api/expenses/createExpense com despesa única (unique)', async () => {
        const response = await request
            .post('/api/expenses/createExpense')
            .set('Authorization', `Bearer ${testToken}`) 
            .send({
                userId: 2,
                description: 'Compra de supermercado',
                amount: 100,
                date: new Date(),
                expenseType: 'unique'
            });
        expect(response.status).toBe(201); 
        expect(response.body.description).toContain('Compra de supermercado');
    });

    // ✅ Testando despesa parcelada (installment)
    it('POST /api/expenses/createExpense com despesa parcelada (installment)', async () => {
        const response = await request
            .post('/api/expenses/createExpense')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                userId: 2,
                description: 'Compra de TV',
                amount: 3000,
                date: new Date(),
                expenseType: 'installment',
                installments: 3
            });
        expect(response.status).toBe(201); 
        expect(response.body.length).toBe(3); // Deve criar 3 parcelas
        expect(response.body[0].description).toContain('Parcela 1/3');
    });

    // ✅ Testando despesa recorrente (recurring)
    it('POST /api/expenses/createExpense com despesa recorrente (recurring)', async () => {
        const response = await request
            .post('/api/expenses/createExpense')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                userId: 2,
                description: 'Mensalidade da Faculdade',
                amount: 200,
                date: new Date(),
                expenseType: 'recurring'
            });
        expect(response.status).toBe(201); 
        expect(response.body.expenseType).toBe('recurring');
        expect(response.body.recurring).toBe(true);
    });

    // ✅ Testando erro ao enviar despesa parcelada sem número de parcelas
    it('POST /api/expenses/createExpense com erro de despesa parcelada sem parcelas', async () => {
        const response = await request
            .post('/api/expenses/createExpense')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                userId: 2,
                description: 'Curso Online',
                amount: 500,
                date: new Date(),
                expenseType: 'installment'
            });
        expect(response.status).toBe(400); 
        expect(response.body.error).toContain('Parcelas devem ser especificadas para despesas parceladas');
    });

    // ✅ Testando erro ao enviar despesa com token inválido
    it('POST /api/expenses/createExpense com token inválido deve falhar', async () => {
        const response = await request
            .post('/api/expenses/createExpense')
            .set('Authorization', 'Bearer invalidtoken123')
            .send({
                userId: 2,
                description: 'Teste de erro',
                amount: 50,
                date: new Date(),
                expenseType: 'unique'
            });
        expect(response.status).toBe(403); 
    });
});