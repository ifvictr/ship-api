module.exports = (sequelize, DataTypes) => {
    const ProjectImage = sequelize.define(
        'ProjectImage',
        {
            project_id: DataTypes.INTEGER,
            url: DataTypes.STRING
        },
        {
            tableName: 'project_images',
            underscored: true
        }
    )
    ProjectImage.associate = models => {
        ProjectImage.belongsTo(models.Project)
    }

    return ProjectImage
}