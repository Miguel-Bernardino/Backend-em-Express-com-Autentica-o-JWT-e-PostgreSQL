import {ITask, Task} from '../models/Task.js';
import { IUser, User } from '../models/User.js';
import db from '../models/index.js';

const findTaskByFilters = async (filters: any) => {
    return await db.tasks.findAll(
        { 
            where: { ...filters }
        }
    );
}

async function isUserExists(userId: number): Promise<any> {
    const user = await db.users.findOne({ where: { id: userId } });
    return user;
}

async function isValidUser(taskId: number, userTokenedId: number): Promise<any> {
    
    const task = await findTaskByFilters({ id: taskId });
    
    if(!task){
        return { status: 404, message: 'Tarefa não encontrada.' };
    }

    //const taskUser = await findTaskByFilters({ userId: task[0].userId });

    if(userTokenedId !== task[0]?.userId){
        return { status: 403, message: 'Acesso negado à tarefa.' };
    }

    const user = await findTaskByFilters({ id: userTokenedId });

    if(!user){
        return { status: 404, message: 'Usuário não encontrado.' };
    }

    return { status: 200, user};

}

export async function createTask(userID:number, task: ITask): Promise<any> { 
    try {


        const user = await isUserExists(userID);

        if(!user || user.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }

        console.log("userID", userID);
        //console.log("user", user);

        console.log("task", task);

        await db.tasks.create({ 
            title: task.title, 
            description: task.description, 
            userId: userID,
            completed: false,
            deleted: false
        });
        
        return { status: 201, task: {            
            title: task.title, 
            description: task.description, 
            userId: userID,
            completed: false,
            deleted: false
        }};

    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Erro ao criar a tarefa.' };
    
    }
}

export const getTasksByUserId = async (userId: number, filters: any): Promise<any> => {
    try {

        //const query = { user: userId };
        //const tasks = await Task.find(query);
        console.log("userId", userId);
        const tasks = await findTaskByFilters({ userId: userId, deleted: false, ...filters });

        console.log("tasks", tasks);
        
        if (!tasks || tasks.length === 0) {
            return { status: 404, message: 'Tarefas não encontradas.' };
        }
        
        const validUser = await isValidUser(tasks[0]?.id, userId);

        if(!validUser || validUser.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }
        
        return { status: 200, tasks };

    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Erro ao buscar as tarefas.' };
    
    }
};

export const getTasksById = async (taskId: number, userId: number): Promise<any> => {
    try {

        const task = await findTaskByFilters({ id: taskId, deleted: false });

        if(!task){
            return { status: 404, message: 'Tarefa não encontrada.' };
        }
        
        const validUser = await isValidUser(task[0].id, userId);

        if(!validUser || validUser.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }

        return { status: 200, task };

    } catch (error) {
        
        return { status: 500, message: 'Erro ao buscar as tarefas.' };
    
    }
};

export const updateTask = async (taskId: number, userId: number, updateData: Partial<ITask>): Promise<any> => {

    try {


        const task = await findTaskByFilters({ id: taskId });
        
        if(!task){
            return { status: 404, message: 'Tarefa não encontrada.' };
        }
        
        const validUser = await isValidUser(task[0].id, userId);

        if(!validUser || validUser.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }

        if(task[0].deleted || updateData.deleted !== undefined){
            return { status: 404, message: 'Tarefa não encontrada.' };
        }
        
        Object.assign(task[0], updateData);
        
        await task[0].save();
        
        return { status: 200, task };

    } catch (error) {
        console.log(error); 
        return { status: 500, message: 'Erro ao atualizar a tarefa.' };
    }
}

export const deleteTask = async (taskId: number, userId: number): Promise<any> => {

    try {
        const task = await findTaskByFilters({ id: taskId });

        if(!task){
            return { status: 404, message: 'Tarefa não encontrada.' };
        }   

        const validUser = await isValidUser(task[0].id, userId);

        if(!validUser || validUser.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }
        
        task[0].deleted = true;
        await task[0].save();

        return { status: 200, message: 'Tarefa deletada com sucesso.' };
    
    } catch (error) {
        return { status: 500, message: 'Erro ao deletar a tarefa.' };
    }

}

// Existe apenas para demonstracao de restauração de dados
export const restoreTask = async (taskId: number, userId: number): Promise<any> => {

    try {

        const task = await findTaskByFilters({ id: taskId });

        if(!task) {
            return { status: 404, message: 'Tarefa não encontrada.' };
        }

        const validUser = await isValidUser(task[0].id, userId);

        if(!validUser || validUser.status >= 400){
            return { status: 403, message: 'Usuário inválido.' };
        }

        if(!task[0].deleted){
            return { status: 400, message: 'A tarefa não está deletada.' };
        }

        task[0].deleted = false;
        await task[0].save();

        return { status: 200, message: 'Tarefa restaurada com sucesso.' };
    
    } catch (error) {
        return { status: 500, message: 'Erro ao restaurar a tarefa.' };
    }
}