module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            github_id: DataTypes.INTEGER,
            slack_id: DataTypes.STRING,
            auth_token: DataTypes.STRING,
            auth_token_created_at: DataTypes.DATE
        },
        {
            tableName: 'users',
            underscored: true,
            defaultScope: {
                attributes: {
                    exclude: [
                        'auth_token',
                        'auth_token_created_at',
                        'email',
                        'github_id',
                        'slack_id',
                        'updated_at'
                    ]
                }
            }
        }
    )
    User.associate = models => {
        User.hasMany(models.ProjectComment, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            as: 'comments'
        })
        User.belongsToMany(models.Project, {
            through: models.ProjectCreator,
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            }
        })
        User.hasMany(models.ProjectUpvote, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            as: 'upvotes'
        })
    }

    return User
}