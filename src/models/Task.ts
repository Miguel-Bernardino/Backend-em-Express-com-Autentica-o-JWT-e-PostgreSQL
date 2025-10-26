export interface ITask {
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  deleted: boolean; 
}

export const Task = (sequelize: any, Sequelize: any) => {
    const Task = sequelize.define("task", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    Task.associate = (models: any) => {

      Task.belongsTo(models.User || models.user, { foreignKey: 'userId', as: 'user' });
    
    };

    return Task;
};

