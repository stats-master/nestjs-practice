import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.taskService.getAllTasks();
    // }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ) {
        return this,this.taskService.updateTaskStatusById(id,status);
    }
}
