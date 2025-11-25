import express from 'express';
import cors from 'cors';
import { InMemoryRouteRepository } from './adapters/outbound/persistence/InMemoryRouteRepository';
import { RoutesController } from './adapters/inbound/http/RoutesController';

import { BankingService } from './core/application/services/BankingService';
import { PoolingService } from './core/application/services/PoolingService';
import { BankingController } from './adapters/inbound/http/BankingController';
import { PoolingController } from './adapters/inbound/http/PoolingController';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const routeRepository = new InMemoryRouteRepository();
const routesController = new RoutesController(routeRepository);

const bankingService = new BankingService();
const bankingController = new BankingController(bankingService);

const poolingService = new PoolingService();
const poolingController = new PoolingController(poolingService);

app.get('/routes', (req, res) => routesController.getAllRoutes(req, res));
app.post('/routes/:id/baseline', (req, res) => routesController.setBaseline(req, res));
app.get('/routes/comparison', (req, res) => routesController.getComparison(req, res));
app.get('/routes/:id/compliance', (req, res) => routesController.getCompliance(req, res));

app.get('/banking/records', (req, res) => bankingController.getBalance(req, res));
app.post('/banking/bank', (req, res) => bankingController.bank(req, res));
app.post('/banking/apply', (req, res) => bankingController.apply(req, res));

app.post('/pools', (req, res) => poolingController.createPool(req, res));

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
