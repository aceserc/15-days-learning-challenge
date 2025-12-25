'use client';

import { Markdown } from '@/components/markdown';

interface PrizeProps {
	content: string;
}

export const Prize = ({ content }: PrizeProps) => {
	return (
		<div className="bg-card/50 p-6 rounded-xl border shadow-sm w-full">
			<Markdown>{content}</Markdown>
		</div>
	);
};
