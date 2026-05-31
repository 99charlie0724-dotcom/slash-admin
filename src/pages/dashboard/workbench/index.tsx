import { CheckCircle, Clock3, Eye, FileText } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface QuickStat {
	title: string;
	value: number;
	suffix: string;
	trend: number;
	icon: React.ElementType;
}

interface OperationRecord {
	key: string;
	title: string;
	action: string;
	time: string;
}

interface Article {
	title: string;
	category: string;
	status: string;
	avatar: string;
}

const Workbench: React.FC = () => {
	const [totalArticles] = useState<number>(1286);
	const [todayPublished] = useState<number>(23);
	const [pendingReview] = useState<number>(15);
	const [hotArticleViews] = useState<number>(56842);

	const quickStats: QuickStat[] = [
		{ title: "总文章数", value: totalArticles, suffix: "篇", trend: 12.5, icon: FileText },
		{ title: "今日发布", value: todayPublished, suffix: "篇", trend: 8.2, icon: Clock3 },
		{ title: "待审核文章", value: pendingReview, suffix: "篇", trend: -3.1, icon: CheckCircle },
		{ title: "热门文章阅读量", value: hotArticleViews, suffix: "次", trend: 25.6, icon: Eye },
	];

	const weeklyPublishData = [
		{ day: "周一", count: 15 },
		{ day: "周二", count: 22 },
		{ day: "周三", count: 18 },
		{ day: "周四", count: 25 },
		{ day: "周五", count: 30 },
		{ day: "周六", count: 12 },
		{ day: "周日", count: 20 },
	];

	const operationRecords: OperationRecord[] = [
		{ key: "1", title: "Vue3 响应式原理解析", action: "发布了新文章", time: "2分钟前" },
		{ key: "2", title: "TypeScript 高级类型", action: "编辑了文章", time: "15分钟前" },
		{ key: "3", title: "CSS Grid 布局实战", action: "审核通过", time: "1小时前" },
		{ key: "4", title: "前端工程化进阶", action: "提交了审核", time: "2小时前" },
		{ key: "5", title: "React 18 新特性", action: "发布了新文章", time: "3小时前" },
	];

	const recentArticles: Article[] = [
		{ title: "Vue3 组合式 API 详解", category: "Vue", status: "已发布", avatar: "/avatars/1.png" },
		{ title: "React Hooks 深入理解", category: "React", status: "待审核", avatar: "/avatars/2.png" },
		{ title: "TypeScript 类型体操", category: "TypeScript", status: "已发布", avatar: "/avatars/3.png" },
		{ title: "前端性能优化实战", category: "性能优化", status: "草稿", avatar: "/avatars/4.png" },
		{ title: "CSS 新特性总结", category: "CSS", status: "已发布", avatar: "/avatars/5.png" },
	];

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">文章管理后台</h1>

			{/* 统计卡片 */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{quickStats.map((stat) => (
					<Card key={stat.title} className="hover:shadow-lg transition-shadow">
						<CardHeader className="flex justify-between items-start">
							<CardTitle className="text-sm text-gray-500">{stat.title}</CardTitle>
							<stat.icon className="w-8 h-8 text-gray-400" />
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold" style={{ color: stat.trend >= 0 ? "#16a34a" : "#dc2626" }}>
								{stat.value}
								<span className="text-sm font-normal ml-1">{stat.suffix}</span>
							</p>
							<div className="mt-2 text-sm">
								{stat.trend >= 0 ? (
									<span className="text-green-600">↑ {stat.trend}%</span>
								) : (
									<span className="text-red-600">↓ {Math.abs(stat.trend)}%</span>
								)}
								<span className="text-gray-400 ml-2">较上周期</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* 图表和表格区域 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
				<Card>
					<CardHeader>
						<CardTitle>最近发布文章</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-72 w-full">
							{/* 替换成你的 Chart 组件 */}
							<div className="flex h-full items-end gap-2 px-4">
								{weeklyPublishData.map((item) => (
									<div key={item.day} className="flex flex-col items-center">
										<div
											className="bg-blue-500 rounded-t w-full max-w-[40px] text-white text-xs flex items-start justify-center"
											style={{ height: `${(item.count / 30) * 250}px` }}
										>
											{item.count}
										</div>
										<span className="text-xs text-gray-500 mt-1">{item.day}</span>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>最近发布文章</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-3 px-2 font-medium text-gray-500">文章标题</th>
										<th className="text-left py-3 px-2 font-medium text-gray-500">操作类型</th>
										<th className="text-left py-3 px-2 font-medium text-gray-500">时间</th>
									</tr>
								</thead>
								<tbody>
									{operationRecords.map((record) => (
										<tr key={record.key} className="border-b border-gray-100 hover:bg-gray-50">
											<td className="py-3 px-2">
												<button type="button" className="text-blue-600 hover:underline">
													{record.title}
												</button>
											</td>
											<td className="py-3 px-2">
												<span
													className={`px-2 py-1 rounded-full text-xs ${
														record.action === "发布了新文章"
															? "bg-green-100 text-green-700"
															: record.action === "编辑了文章"
																? "bg-blue-100 text-blue-700"
																: record.action === "审核通过"
																	? "bg-cyan-100 text-cyan-700"
																	: "bg-orange-100 text-orange-700"
													}`}
												>
													{record.action}
												</span>
											</td>
											<td className="py-3 px-2 text-gray-500">{record.time}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* 文章动态列表 */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>文章动态</CardTitle>
					<Button variant="link">查看更多</Button>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{recentArticles.map((article) => (
							<div
								key={article.title}
								className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
							>
								<div className="flex items-center gap-3">
									<Avatar className="w-10 h-10">
										<AvatarImage src={article.avatar} alt={article.title} />
										<AvatarFallback>{article.title.slice(0, 1)}</AvatarFallback>
									</Avatar>
									<div>
										<button type="button" className="text-gray-900 font-medium hover:text-blue-600">
											{article.title}
										</button>
										<div className="flex gap-2 mt-1">
											<span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{article.category}</span>
											<span
												className={`px-2 py-0.5 rounded text-xs ${
													article.status === "已发布"
														? "bg-green-100 text-green-700"
														: article.status === "待审核"
															? "bg-orange-100 text-orange-700"
															: "bg-gray-100 text-gray-700"
												}`}
											>
												{article.status}
											</span>
										</div>
									</div>
								</div>
								<Button variant="ghost" size="sm">
									编辑
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Workbench;
