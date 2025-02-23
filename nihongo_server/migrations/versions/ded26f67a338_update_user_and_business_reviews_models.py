"""update user and business reviews models

Revision ID: ded26f67a338
Revises: 58ac83271394
Create Date: 2024-07-25 16:43:45.577803

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ded26f67a338'
down_revision = '58ac83271394'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('business_reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_business_reviews_admin_id_admins', type_='foreignkey')
        batch_op.drop_constraint('fk_business_reviews_citizen_id_citizens', type_='foreignkey')
        batch_op.drop_constraint('fk_business_reviews_traveler_id_travelers', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_business_reviews_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('admin_id')
        batch_op.drop_column('citizen_id')
        batch_op.drop_column('traveler_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('business_reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('traveler_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('citizen_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('admin_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_business_reviews_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_business_reviews_traveler_id_travelers', 'travelers', ['traveler_id'], ['id'])
        batch_op.create_foreign_key('fk_business_reviews_citizen_id_citizens', 'citizens', ['citizen_id'], ['id'])
        batch_op.create_foreign_key('fk_business_reviews_admin_id_admins', 'admins', ['admin_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
