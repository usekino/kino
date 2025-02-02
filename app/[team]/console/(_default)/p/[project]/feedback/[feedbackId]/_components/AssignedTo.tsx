export const AssignedTo = () => {
	return (
		<div className='flex rounded-lg border bg-muted'>
			<div className='flex items-center justify-center rounded-l-lg border-r bg-accent/30 px-4'>
				<div className='mr-[-2.25rem] size-10 overflow-hidden rounded-full border'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src='https://i.pravatar.cc/150?img=natedunn' alt='natedunn' />
				</div>
			</div>
			<div className='flex w-full flex-col justify-center px-8 py-3'>
				<div className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
					Assigned to
				</div>
				<div>Nate Dunn (@natedunn)</div>
			</div>
		</div>
	);
};
