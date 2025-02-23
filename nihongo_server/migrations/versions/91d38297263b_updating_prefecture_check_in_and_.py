"""updating prefecture check in and wishlists models

Revision ID: 91d38297263b
Revises: 313daf5b147a
Create Date: 2024-07-28 16:09:26.371009

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91d38297263b'
down_revision = '313daf5b147a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('prefecture_checkin', schema=None) as batch_op:
        batch_op.drop_column('visited')

    with op.batch_alter_table('prefecture_wishlist', schema=None) as batch_op:
        batch_op.drop_column('wish_list')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('prefecture_wishlist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('wish_list', sa.BOOLEAN(), nullable=True))

    with op.batch_alter_table('prefecture_checkin', schema=None) as batch_op:
        batch_op.add_column(sa.Column('visited', sa.BOOLEAN(), nullable=True))

    # ### end Alembic commands ###
