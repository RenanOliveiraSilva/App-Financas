import { addMonths, subDays } from 'date-fns';

/**
 * Calcula o início e término do ciclo atual baseado no dia configurado
 * @param cycleStartDay - Dia do início do ciclo
 * @returns { startDate: Date, endDate: Date }
 */
export const calculateCycleDates = (cycleStartDay: number): { startDate: Date; endDate: Date } => {
    const now = new Date();

    // Define o início do ciclo atual
    let startDate = new Date(now.getFullYear(), now.getMonth(), cycleStartDay);

    // Se a data atual for antes do início do ciclo, retrocede um mês
    if (now < startDate) {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, cycleStartDay);
    }

    // Calcula o término como um mês menos um dia após o início
    const endDate = subDays(addMonths(startDate, 1), 1);

    return { startDate, endDate };
};
