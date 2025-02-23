"""create profile picture model

Revision ID: 10f75c725056
Revises: 9b7ad420d9de
Create Date: 2024-08-08 22:11:40.671342

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '10f75c725056'
down_revision = '9b7ad420d9de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userProfilePics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('picture_route', sa.String(), server_default='https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg', nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_userProfilePics_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('profile_picture')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_picture', sa.VARCHAR(), nullable=True))

    op.drop_table('userProfilePics')
    # ### end Alembic commands ###
