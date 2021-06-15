import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddUserIdToAppointments1623497544684 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
				isNullable: true,
			})
		);
		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'ApointmentUser',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropForeignKey('appointments', 'ApointmentUser');
		await queryRunner.dropColumn('appointments', 'user_id');
	}
}
